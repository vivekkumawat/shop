import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserTypeEnum } from '../../user/enums/user-type.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class SellerAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authUser = request.user;
    try {
      const user = await this.authService.validateUser(
        authUser._id,
        UserTypeEnum.SELLER,
      );
      if (user) return true;
      else false;
    } catch (e) {
      return false;
    }
  }
}
