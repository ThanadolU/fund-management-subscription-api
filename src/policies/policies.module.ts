import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy])],
})
export class PoliciesModule {}
