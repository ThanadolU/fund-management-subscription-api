import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Portfolio } from '../portfolios/entity/portfolio.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_code', unique: true })
  customerCode: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.customer)
  portfolios: Portfolio[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
