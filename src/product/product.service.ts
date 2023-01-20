import { Injectable } from '@nestjs/common';
import { ProductDao } from './product.dao';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly productDao: ProductDao) {}

  async addProduct(name: string, price: number, catalogId: string) {
    return await this.productDao.createProduct(name, price, catalogId);
  }

  async getAllProductsOfSeller(catalogId: string) {
    return await this.productDao.findAllProductsByCatalogId(catalogId);
  }

  async getAllProductsByIds(productIds: string[]): Promise<Product[]> {
    return await this.productDao.findAllProductsByIds(productIds);
  }
}
