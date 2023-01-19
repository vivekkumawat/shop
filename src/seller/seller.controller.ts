import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seller endpoints')
@Controller('seller')
export class SellerController {
  @Post('create-catalog')
  async createCatalog() {}

  @Get('orders')
  async getOrders() {}
}
