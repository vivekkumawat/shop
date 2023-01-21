import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../order/order.service';
import { CatalogService } from '../catalog/catalog.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthToken } from '../constants';
import { AuthGuard } from '@nestjs/passport';
import { BuyerAuthGuard } from '../auth/guards/buyer-auth.guard';
import { User } from '../user/schemas/user.schema';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';
import { ICreateOrder } from '../order/interfaces/create-order.interface';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@ApiBearerAuth(AuthToken)
@ApiTags('Buyer endpoints')
@Controller('buyer')
export class BuyerController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(AuthGuard('jwt'), BuyerAuthGuard)
  @Get('list-of-sellers')
  async sellersList(): Promise<User[]> {
    return await this.userService.findSellers();
  }

  @UseGuards(AuthGuard('jwt'), BuyerAuthGuard)
  @Get('seller-catalog/:sellerId')
  async sellerCatalog(@Param('sellerId') sellerId: string) {
    const catalog = await this.catalogService.getCatalogBySellerId(sellerId);
    if (!catalog) {
      throw new BadRequestException(`Seller don't have any catalog yet`);
    }
    const products = await this.productService.getAllProductsOfSeller(
      catalog._id,
    );
    return {
      catalogId: catalog._id,
      catalogName: catalog.name,
      products,
    };
  }

  @UseGuards(AuthGuard('jwt'), BuyerAuthGuard)
  @Post('create-order/:sellerId')
  async createOrder(
    @Param('sellerId') sellerId: string,
    @Body() createOrderDto: CreateOrderDto,
    @AuthenticatedUser() buyer: User,
  ) {
    const catalog = await this.catalogService.getCatalogBySellerId(sellerId);
    if (!catalog) {
      throw new BadRequestException(`Seller don't have any catalog yet`);
    }
    const products = await this.productService.getAllProductsOfSeller(
      catalog._id,
    );
    const isProductBelongsToCatalog = createOrderDto.productIds.every(
      (inputProductId) => {
        return products.some((product) => inputProductId === product._id);
      },
    );
    if (!isProductBelongsToCatalog) {
      throw new BadRequestException(
        `Products not found in the seller's catalog`,
      );
    }

    const createOrderPayload: ICreateOrder = {
      sellerId: sellerId,
      buyerId: buyer._id,
      productIds: createOrderDto.productIds,
    };
    return await this.orderService.createOrder(createOrderPayload);
  }
}
