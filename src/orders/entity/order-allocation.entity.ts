import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_allocations')
export class OrderAllocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderCode: string;

  @Column()
  stockCode: string;

  @Column('decimal')
  amount: number;

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
