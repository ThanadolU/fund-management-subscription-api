import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PolicyStock } from '../policy-stocks/policy-stock.entity';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_code', unique: true })
  stockCode: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => PolicyStock, (policyStock) => policyStock.stock)
  policyStocks: PolicyStock[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
