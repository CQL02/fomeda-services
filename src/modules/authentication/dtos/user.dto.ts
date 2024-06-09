import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  MinLength,
  MaxLength,
  IsEmail
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'The fullname cannot be empty' })
  fullname: string;

  @IsNotEmpty({ message: 'The username cannot be empty' })
  @MinLength(6, { message: 'The username cannot be less than 6 characters' })
  @MaxLength(20, { message: 'The username cannot be more than 20 characters' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'The email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email address' })
  email_address: string;

  @IsString()
  @IsNotEmpty({ message: 'The password cannot be empty' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'The type cannot be empty' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'The company name cannot be empty' })
  company_name: string;

  @IsString()
  @IsNotEmpty({ message: 'The company no cannot be empty' })
  company_no: string;

  @IsString()
  @IsNotEmpty({ message: 'The company address cannot be empty' })
  company_address: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'The is_active address cannot be empty' })
  is_active?: boolean

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'The role_id cannot be empty' })
  role_id?: string;
}
