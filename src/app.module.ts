import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [AuthModule, ProductModule, OrderModule, SellerModule, BuyerModule, CatalogModule],
})
export class AppModule {}
