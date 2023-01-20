import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductDao {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(
    name: string,
    price: number,
    catalogId: string,
  ): Promise<Product> {
    return this.productModel.create({
      _id: uuidv4(),
      name,
      price,
      catalogId,
    });
  }

  async findAllProductsByCatalogId(catalogId: string) {
    return this.productModel.find({ catalogId });
  }

  async findAllProductsByIds(productIds: string[]): Promise<Product[]> {
    return this.productModel.find({ _id: { $in: productIds } });
  }
}
