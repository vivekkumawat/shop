import { Injectable } from '@nestjs/common';
import { ICreateOrder } from './interfaces/create-order.interface';
import { OrderDao } from './order.dao';

@Injectable()
export class OrderService {
  constructor(private readonly orderDao: OrderDao) {}

  async createOrder(createOrderPayload: ICreateOrder) {
    return await this.orderDao.createOrder(createOrderPayload);
  }

  async getAllOrdersBySellerId(sellerId: string) {
    return await this.orderDao.findAllOrdersBySellerId(sellerId);
  }
}
