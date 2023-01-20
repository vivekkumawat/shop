import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsArray()
  productIds: string[];
}
