import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserTypeEnum } from '../enums/user-type.enum';

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: Object.values(UserTypeEnum) })
  userType: UserTypeEnum;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userType: 1, email: 1 }, { unique: true });
export type UserDocument = User & Document;
