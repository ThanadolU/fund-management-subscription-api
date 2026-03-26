import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';
import { Policy } from 'src/policies/policy.entity';
import { Customer } from 'src/customers/customer.entity';
import { Portfolio } from './entity/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, Customer, Policy])],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
})
export class PortfoliosModule {}
