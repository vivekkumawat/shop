import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { decrypt } from '../util';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
@ApiTags('Auth endpoints')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<Record<string, string>> {
    const user = await this.userService.getUserByEmailAndType(
      payload.email,
      payload.userType,
    );
    const isValidPassword = await decrypt(payload.password, user.password);
    if (!user || !isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({
      _id: user._id,
      userType: user.userType,
    });
    return {
      access_token: jwt,
    };
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.userService.createUser(payload);
  }
}
