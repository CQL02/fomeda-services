import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty, IsArray
} from "class-validator";
import { CategoryGeneralSubspecification } from "../domain/schema/category-general-subspecification.schema";

export class GeneralSpecificationDto {

  @IsString()
  @IsNotEmpty()
  cat_type: string;

  @IsString()
  @IsNotEmpty()
  subcat_spec_name: string;

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

  @IsBoolean()
  allow_input: boolean;

  @IsArray()
  children: Array<CategoryGeneralSubspecification>;
}
