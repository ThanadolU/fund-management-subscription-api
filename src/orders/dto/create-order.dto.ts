import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'portfolio code is required' })
  portfolioCode: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'amount is required' })
  amount: number;
}
