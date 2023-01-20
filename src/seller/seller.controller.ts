import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { User } from '../user/schemas/user.schema';
import { SellerAuthGuard } from '../auth/guards/seller-auth.guard';
import { AuthToken } from '../constants';
import { OrderService } from '../order/order.service';
import { CatalogService } from '../catalog/catalog.service';
import { CreateCatalogDto } from '../catalog/dtos/create-catalog.dto';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@ApiBearerAuth(AuthToken)
@ApiTags('Seller endpoints')
@Controller('seller')
export class SellerController {
  constructor(
    private readonly orderService: OrderService,
    private readonly catalogService: CatalogService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'), SellerAuthGuard)
  @Post('create-catalog')
  async createCatalog(
    @Body() payload: CreateCatalogDto,
    @AuthenticatedUser() seller: User,
  ) {
    const { products } = payload;
    const catalog = await this.catalogService.createCatalogForSeller(
      payload.name,
      seller._id,
      [],
    );
    const createdProductIds = [];
    for (const product of products) {
      const createdProdcuts = await this.productService.addProduct(
        product.name,
        product.price,
        catalog._id,
      );
      createdProductIds.push(createdProdcuts._id);
    }
    await this.catalogService.updateCatalogProducts(
      catalog._id,
      createdProductIds,
    );
  }

  @UseGuards(AuthGuard('jwt'), SellerAuthGuard)
  @Get('orders')
  async getOrders(@AuthenticatedUser() seller: User) {
    const orders = await this.orderService.getAllOrdersBySellerId(seller._id);
    const response: Record<string, any> = {};
    for (const order of orders) {
      const products = await this.productService.getAllProductsByIds(
        order.productIds,
      );
      response.buyerId = order.buyerId;
      response.products = products;
    }
    return response;
  }
}
