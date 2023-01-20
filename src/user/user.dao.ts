import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateUser } from './interfaces/create-user.interface';
import { User, UserDocument } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UserTypeEnum } from './enums/user-type.enum';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByIdAndType(
    _id: string,
    userType: UserTypeEnum,
  ): Promise<User | null> {
    return this.userModel.findOne({ _id, userType });
  }

  async findByEmailAndType(
    email: string,
    userType: UserTypeEnum,
  ): Promise<User | null> {
    return this.userModel.findOne({ email, userType });
  }

  async createUser(createUserPayload: ICreateUser) {
    return this.userModel.create({ _id: uuidv4(), ...createUserPayload });
  }

  async findAllSellers() {
    return this.userModel.find(
      {
        userType: UserTypeEnum.SELLER,
      },
      { password: 0 },
    );
  }
}
