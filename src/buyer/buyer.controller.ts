import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Buyer endpoints')
@Controller('buyer')
export class BuyerController {
  @Get('list-of-sellers')
  async sellersList() {}

  @Get('seller-catalog/:sellerId')
  async sellerCatalog(@Param('sellerId') sellerId: string) {}

  @Post('create-order/:sellerId')
  async createOrder(@Param('sellerId') sellerId: string) {}
}
