import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';

export class SupplierDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  company_no: string;

  @IsString()
  @IsNotEmpty()
  company_address: string;

  @IsString()
  @IsOptional()
  approved_by?: string;

  @IsDate()
  @IsOptional()
  approved_on?: Date;

  @IsString()
  @IsOptional()
  reason?: string;
}
