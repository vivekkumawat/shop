import { Injectable } from '@nestjs/common';
import { CatalogDao } from './catalog.dao';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogDao: CatalogDao) {}

  async getCatalogBySellerId(sellerId: string) {
    return await this.catalogDao.findCatalogBySellerId(sellerId);
  }

  async createCatalogForSeller(
    name: string,
    sellerId: string,
    productIds: string[],
  ) {
    return await this.catalogDao.createCatalog(name, sellerId, productIds);
  }

  async updateCatalogProducts(catalogId: string, productIds: string[]) {
    await this.catalogDao.updateCatalog(catalogId, productIds);
  }
}
