import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order, OrderStatus } from './entity/order.entity';
import { Portfolio } from '../portfolios/entity/portfolio.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PolicyStock } from '../policy-stocks/policy-stock.entity';
import { OrderAllocation } from './entity/order-allocation.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Portfolio)
    private readonly portfolioRepo: Repository<Portfolio>,

    @InjectRepository(PolicyStock)
    private readonly policyStockRepo: Repository<PolicyStock>,

    @InjectRepository(OrderAllocation)
    private readonly orderAllocationRepo: Repository<OrderAllocation>,
  ) {}

  async create(dto: CreateOrderDto) {
    const portfolio = await this.portfolioRepo.findOne({
      where: { portfolioCode: dto.portfolioCode },
    });

    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const existingOrder = await this.orderRepo.findOne({
      where: {
        portfolio: { portfolioCode: dto.portfolioCode },
        status: In([OrderStatus.PENDING, OrderStatus.PROCESSING]),
      },
      relations: ['portfolio'],
    });
    if (existingOrder) {
      throw new BadRequestException('Portfolio already has an active order');
    }

    const orderCode = `O-${Date.now()}`;

    const order = this.orderRepo.create({
      orderCode,
      portfolio,
      amount: dto.amount,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepo.save(order);

    return {
      orderCode: savedOrder.orderCode,
      status: savedOrder.status,
    };
  }

  async allocate(orderCode: string) {
    const order = await this.orderRepo.findOne({
      where: { orderCode },
      relations: ['portfolio', 'portfolio.policy'],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Order cannot be executed');
    }

    try {
      order.status = OrderStatus.PROCESSING;
      await this.orderRepo.save(order);

      const policyCode = order.portfolio.policy.policyCode;

      const policyStocks = await this.policyStockRepo.find({
        where: { policy: { policyCode } },
      });

      const allocations = policyStocks.map((ps) => {
        const amount = (order.amount * Number(ps.weight)) / 100;
        return {
          orderCode: order.orderCode,
          stockCode: ps.stockCode,
          amount,
        };
      });

      await this.orderAllocationRepo.save(allocations);

      order.status = OrderStatus.COMPLETED;
    } catch {
      order.status = OrderStatus.FAILED;
    }

    await this.orderRepo.save(order);

    return {
      orderCode: order.orderCode,
      status: order.status,
    };
  }

  async cancel(orderCode: string) {
    const order = await this.orderRepo.findOne({
      where: { orderCode },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be cancelled');
    }

    order.status = OrderStatus.FAILED;

    await this.orderRepo.save(order);

    return {
      orderCode: order.orderCode,
      status: order.status,
    };
  }

  async findAll() {
    const orders = await this.orderRepo.find({
      relations: ['portfolio', 'portfolio.customer', 'portfolio.policy'],
    });

    return orders.map((order) => ({
      orderCode: order.orderCode,
      portfolioCode: order.portfolio.portfolioCode,
      amount: order.amount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
