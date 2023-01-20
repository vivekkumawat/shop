import { BadRequestException, Injectable } from '@nestjs/common';
import { ICreateUser } from './interfaces/create-user.interface';
import { User } from './schemas/user.schema';
import { UserDao } from './user.dao';
import { encrypt } from '../util';
import { UserTypeEnum } from './enums/user-type.enum';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findUserByIdAndType(
    _id: string,
    userType: UserTypeEnum,
  ): Promise<User | null> {
    return await this.userDao.findByIdAndType(_id, userType);
  }

  async getUserByEmailAndType(email: string, userType: UserTypeEnum) {
    return await this.userDao.findByEmailAndType(email, userType);
  }

  async createUser(createUserPayload: ICreateUser) {
    const updatedPayload: ICreateUser = {
      ...createUserPayload,
      password: await encrypt(createUserPayload.password),
    };
    try {
      return await this.userDao.createUser(updatedPayload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findSellers() {
    return await this.userDao.findAllSellers()
  }
}
