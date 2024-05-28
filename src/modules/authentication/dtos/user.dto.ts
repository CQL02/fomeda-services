import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsUUID
} from 'class-validator';

export class UserDto {
  @IsUUID()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email_address: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  role_id: string;
}
