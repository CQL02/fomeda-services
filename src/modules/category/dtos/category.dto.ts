import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty, IsArray
} from "class-validator";
import { SubcategoryDto } from "./subcategory.dto";

export class CategoryDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  cat_name: string;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsString()
  created_name: string;

  @IsDate()
  created_on: Date;

  @IsString()
  @IsNotEmpty()
  last_updated_by: string;

  @IsString()
  last_updated_name: string;

  @IsDate()
  last_updated_on: Date;

  @IsBoolean()
  is_active: boolean;

  @IsArray()
  children: Array<SubcategoryDto>;
}
