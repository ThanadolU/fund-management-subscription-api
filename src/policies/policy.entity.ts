import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PolicyStock } from '../policy-stocks/policy-stock.entity';
import { Portfolio } from '../portfolios/entity/portfolio.entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'policy_code', unique: true })
  policyCode: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => PolicyStock, (policyStock) => policyStock.policy)
  policyStocks: PolicyStock[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.policy)
  portfolios: Portfolio[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
