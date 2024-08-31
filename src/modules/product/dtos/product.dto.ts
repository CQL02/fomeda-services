import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { ProductSpecificationDto } from "./product-specification.dto";

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsString()
  @IsNotEmpty()
  cat_id: string;

  @IsString()
  cat_name: string;

  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  owner_username: string;

  @IsObject()
  product_img: object;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  last_updated_on: Date;

  @IsString()
  approved_by: string;

  @IsDate()
  approved_on: Date;

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  rating: number;

  @IsArray()
  specification: Array<ProductSpecificationDto>;
}