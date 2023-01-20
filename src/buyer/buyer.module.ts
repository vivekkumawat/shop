import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Buyer, BuyerSchema } from './schemas/buyer.schema';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { SellerModule } from '../seller/seller.module';
import { CatalogModule } from '../catalog/catalog.module';
import { OrderModule } from '../order/order.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Buyer.name, schema: BuyerSchema }]),
    SellerModule,
    CatalogModule,
    OrderModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
  providers: [BuyerService],
  controllers: [BuyerController],
})
export class BuyerModule {}
