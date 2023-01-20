import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from './schemas/seller.schema';

@Injectable()
export class SellerDao {
  constructor(
    @InjectModel(Seller.name)
    private sellerModel: Model<SellerDocument>,
  ) {}

  async findAllSellers(): Promise<Seller[]> {
    return this.sellerModel.find();
  }
}
