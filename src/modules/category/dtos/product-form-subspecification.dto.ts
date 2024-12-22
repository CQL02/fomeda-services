import { IsBoolean, IsString } from "class-validator";

export class ProductFormSubspecificationDto {
  @IsString()
  _id: string;

  @IsString()
  subcat_subspec_name: string;

  @IsBoolean()
  is_required: boolean;

  @IsBoolean()
  allow_input: boolean;

  @IsString()
  prefix: string;

  @IsString()
  suffix: string;

  @IsString()
  field_type: string;
}