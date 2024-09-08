import {
  IsBoolean,
  IsNotEmpty, IsOptional, IsString,
  IsUUID,
} from 'class-validator';

export class RoleDto {
  @IsString()
  @IsNotEmpty({ message: 'The fullname cannot be empty' })
  role_name: string;

  @IsUUID()
  module_role_id?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty({ message: 'The is_active address cannot be empty' })
  is_active?: boolean
}
