import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserTypeEnum } from '../../user/enums/user-type.enum';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Object.values(UserTypeEnum) })
  @IsEnum(UserTypeEnum)
  userType: UserTypeEnum;
}
