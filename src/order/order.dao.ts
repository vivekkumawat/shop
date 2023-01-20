import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateOrder } from './interfaces/create-order.interface';
import { Order, OrderDocument } from './schemas/order.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderDao {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrderPayload: ICreateOrder) {
    return this.orderModel.create({ _id: uuidv4(), ...createOrderPayload });
  }

  async findAllOrdersBySellerId(sellerId: string) {
    return this.orderModel.find({ sellerId });
  }
}
