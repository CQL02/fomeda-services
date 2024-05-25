import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class GeneralSubspecificationDto {
  @IsString()
  @IsNotEmpty()
  subcat_spec_code: string;

  @IsString()
  @IsNotEmpty()
  subcat_subspec_code: string;

  @IsString()
  @IsNotEmpty()
  subcat_subspec_name: string;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsDate()
  created_on: Date;

  @IsString()
  @IsNotEmpty()
  last_updated_by: string;

  @IsDate()
  last_updated_on: Date;

  @IsBoolean()
  is_active: boolean;
}
