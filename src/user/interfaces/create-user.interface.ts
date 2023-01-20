import { UserTypeEnum } from '../enums/user-type.enum';

export interface ICreateUser {
  email: string;
  password: string;
  userType: UserTypeEnum;
}
