import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Portfolio } from 'src/portfolios/entity/portfolio.entity';
import { PolicyStock } from 'src/policy-stocks/policy-stock.entity';
import { OrderAllocation } from './entity/order-allocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Portfolio, PolicyStock, OrderAllocation]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
