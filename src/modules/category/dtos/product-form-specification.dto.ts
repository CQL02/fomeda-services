import { IsArray, IsBoolean, IsString } from "class-validator";
import { ProductFormSubspecificationDto } from "./product-form-subspecification.dto";

export class ProductFormSpecificationDto {
  @IsString()
  _id: string;

  @IsString()
  subcat_spec_name: string;

  @IsString()
  cat_type: string;

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

  @IsArray()
  subspecification: Array<ProductFormSubspecificationDto>;
}

