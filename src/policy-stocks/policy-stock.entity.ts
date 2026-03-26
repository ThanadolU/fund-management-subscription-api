import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Policy } from '../policies/policy.entity';
import { Stock } from '../stocks/stock.entity';

@Entity('policy_stocks')
@Unique(['policy', 'stock'])
export class PolicyStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'policy_code', length: 20 })
  policyCode: string;

  @Column({ name: 'stock_code', length: 10 })
  stockCode: string;

  @ManyToOne(() => Policy, (policy) => policy.policyStocks)
  @JoinColumn({ name: 'policy_code', referencedColumnName: 'policyCode' })
  policy: Policy;

  @ManyToOne(() => Stock, (stock) => stock.policyStocks)
  @JoinColumn({ name: 'stock_code', referencedColumnName: 'stockCode' })
  stock: Stock;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
