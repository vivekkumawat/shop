import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  catalogId: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ catalogId: 1 });
export type ProductDocument = Product & Document;
