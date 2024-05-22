import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class SubcategoryDto {
  @IsString()
  @IsNotEmpty()
  cat_code: string;

  @IsString()
  @IsNotEmpty()
  subcat_code: string;

  @IsString()
  @IsNotEmpty()
  subcat_name: string;

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
