import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Catalog {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  sellerId: string;

  @Prop()
  productIds: string[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
CatalogSchema.index({ sellerId: 1 }, { unique: true });
export type CatalogDocument = Catalog & Document;
