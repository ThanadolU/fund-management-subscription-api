import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { StocksModule } from './stocks/stocks.module';
import { PoliciesModule } from './policies/policies.module';
import { PolicyStocksModule } from './policy-stocks/policy-stocks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'fund_management_subscription',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PortfoliosModule,
    OrdersModule,
    CustomersModule,
    StocksModule,
    PoliciesModule,
    PolicyStocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
