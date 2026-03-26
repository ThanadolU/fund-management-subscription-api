import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfoliosService } from './portfolios.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post('create')
  create(@Body() dto: CreatePortfolioDto) {
    return this.portfoliosService.create(dto);
  }

  @Get()
  findAll() {
    return this.portfoliosService.findAll();
  }
}
