import { Injectable } from '@nestjs/common';
import { UserTypeEnum } from '../user/enums/user-type.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(_id: string, userType: UserTypeEnum) {
    const user = await this.userService.findUserByIdAndType(_id, userType);
    if (user) return user;
    return null;
  }
}
