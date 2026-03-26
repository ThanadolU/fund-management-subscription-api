import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import { Order } from './entity/order.entity';
import { Portfolio } from '../portfolios/entity/portfolio.entity';
import { PolicyStock } from '../policy-stocks/policy-stock.entity';
import { OrderAllocation } from './entity/order-allocation.entity';

describe('OrdersService - Duplicate Order Rule', () => {
  let service: OrdersService;

  const mockOrderRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockPortfolioRepo = {
    findOne: jest.fn(),
  };

  const mockPolicyStockRepo = {};

  const mockAllocationRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepo,
        },
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepo,
        },
        {
          provide: getRepositoryToken(PolicyStock),
          useValue: mockPolicyStockRepo,
        },
        {
          provide: getRepositoryToken(OrderAllocation),
          useValue: mockAllocationRepo,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should prevent duplicate orders for the same portfolio and stock', async () => {
    mockPortfolioRepo.findOne.mockResolvedValue({
      id: 1,
      portfolioCode: 'P001',
    });

    mockOrderRepo.findOne.mockResolvedValue({
      id: 10,
      status: 'PENDING',
    });

    await expect(
      service.create({
        portfolioCode: 'P001',
        amount: 100000,
      }),
    ).rejects.toThrow('Portfolio already has an active order');
  });

  it('should create order if no active order exists', async () => {
    mockPortfolioRepo.findOne.mockResolvedValue({
      id: 1,
      portfolioCode: 'P001',
    });

    mockOrderRepo.findOne.mockResolvedValue(null);

    mockOrderRepo.create.mockReturnValue({
      amount: 100000,
    });

    mockOrderRepo.save.mockResolvedValue({
      id: 1,
      status: 'PENDING',
    });

    const result = await service.create({
      portfolioCode: 'P001',
      amount: 100000,
    });

    expect(result.status).toBe('PENDING');
  });
});
