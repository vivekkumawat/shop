import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CatalogDao {
  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: Model<CatalogDocument>,
  ) {}

  async findCatalogBySellerId(sellerId: string): Promise<Catalog> {
    return this.catalogModel.findOne({
      sellerId: sellerId,
    });
  }

  async createCatalog(name: string, sellerId: string, productIds: string[]) {
    return this.catalogModel.create({
      _id: uuidv4(),
      name,
      sellerId,
      productIds,
    });
  }

  async updateCatalog(catalogId: string, productIds: string[]) {
    return this.catalogModel.updateOne(
      { _id: catalogId },
      { $push: { productIds: { $each: productIds } } },
    );
  }
}
