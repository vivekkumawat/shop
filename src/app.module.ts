import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { CatalogModule } from './catalog/catalog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

const mongooseModule = MongooseModule.forRootAsync({
  imports: [],
  useFactory: async () => ({
    uri: 'mongodb+srv://shop:YoThisIsMyPassword@cluster0.gdjmq.mongodb.net/shop',
    appname: 'shop',
  }),
  inject: [],
});

@Module({
  imports: [
    mongooseModule,
    AuthModule,
    ProductModule,
    OrderModule,
    SellerModule,
    BuyerModule,
    CatalogModule,
    UserModule,
  ],
})
export class AppModule {}
