import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './policy.entity';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepo: Repository<Policy>,
  ) {}

  async findAll() {
    const policies = await this.policyRepo.find({
      relations: ['policyStocks'],
      order: { policyCode: 'ASC' },
    });

    return policies.map((p) => ({
      policyCode: p.policyCode,
      name: p.name,
      policyStocks: (p.policyStocks ?? []).map((ps) => ({
        stockCode: ps.stockCode,
        weight: Number(ps.weight),
      })),
    }));
  }
}
