import { Injectable } from '@nestjs/common';
import { Seller } from './schemas/seller.schema';
import { SellerDao } from './seller.dao';

@Injectable()
export class SellerService {
  constructor(private readonly sellerDao: SellerDao) {}
  async getAllSellers(): Promise<Seller[]> {
    return await this.sellerDao.findAllSellers();
  }
}
