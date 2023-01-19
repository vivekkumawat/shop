import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';
import { CatalogService } from './catalog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }]),
  ],
  providers: [CatalogService],
})
export class CatalogModule {}
