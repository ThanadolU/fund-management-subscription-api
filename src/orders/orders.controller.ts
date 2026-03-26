import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Post(':orderCode/allocate')
  allocate(@Param('orderCode') orderCode: string) {
    return this.ordersService.allocate(orderCode);
  }

  @Patch(':orderCode/cancel')
  cancel(@Param('orderCode') orderCode: string) {
    return this.ordersService.cancel(orderCode);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
