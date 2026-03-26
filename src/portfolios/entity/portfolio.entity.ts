import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/customer.entity';
import { Policy } from '../../policies/policy.entity';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'portfolio_code', unique: true })
  portfolioCode: string;

  @ManyToOne(() => Customer)
  @JoinColumn({
    name: 'customer_code',
    referencedColumnName: 'customerCode',
  })
  customer: Customer;

  @ManyToOne(() => Policy)
  @JoinColumn({
    name: 'policy_code',
    referencedColumnName: 'policyCode',
  })
  policy: Policy;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
