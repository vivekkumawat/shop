import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './schemas/seller.schema';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SellerDao } from './seller.dao';
import { OrderModule } from '../order/order.module';
import { AuthModule } from '../auth/auth.module';
import { CatalogModule } from '../catalog/catalog.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    OrderModule,
    AuthModule,
    CatalogModule,
    ProductModule,
    UserModule,
  ],
  providers: [SellerService, SellerDao],
  controllers: [SellerController],
  exports: [SellerService],
})
export class SellerModule {}
