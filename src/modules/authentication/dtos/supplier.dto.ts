import {
  IsString,
  IsNotEmpty,
  IsDate,
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
  @IsNotEmpty()
  review_status: string;

  @IsDate()
  registered_on: Date;

  @IsDate()
  last_updated_on: Date;

  @IsDate()
  approved_on: Date;
}
