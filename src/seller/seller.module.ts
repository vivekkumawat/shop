import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './schemas/seller.schema';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
  ],
  providers: [SellerService],
  controllers: [SellerController],
})
export class SellerModule {}
