import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entity/portfolio.entity';
import { Customer } from '../customers/customer.entity';
import { Policy } from '../policies/policy.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepo: Repository<Portfolio>,

    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,

    @InjectRepository(Policy)
    private policyRepo: Repository<Policy>,
  ) {}

  async create(dto: CreatePortfolioDto) {
    const customer = await this.customerRepo.findOne({
      where: { customerCode: dto.customerCode },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const policy = await this.policyRepo.findOne({
      where: { policyCode: dto.policyCode },
    });

    if (!policy) {
      throw new Error('Policy not found');
    }

    const portfolioCode = `P-${Date.now()}`;

    const portfolio = this.portfolioRepo.create({
      portfolioCode,
      customer,
      policy,
    });

    const savedPortfolio = await this.portfolioRepo.save(portfolio);

    return {
      portfolioCode: savedPortfolio.portfolioCode,
    };
  }

  async findAll() {
    const portfolios = await this.portfolioRepo.find({
      relations: ['customer', 'policy'],
    });
    return portfolios.map((p) => ({
      portfolioCode: p.portfolioCode,
      customer: {
        customerCode: p.customer.customerCode,
        name: p.customer.name,
      },
      policy: {
        policyCode: p.policy.policyCode,
        name: p.policy.name,
      },
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }
}
