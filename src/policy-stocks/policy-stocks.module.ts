import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyStock } from './policy-stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PolicyStock])],
})
export class PolicyStocksModule {}
