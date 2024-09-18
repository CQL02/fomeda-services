import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsString } from "class-validator";
import { ProductSpecificationDto } from "./product-specification.dto";
import { SubcategoryRatingScoreDto } from "../../category/dtos/subcategory-rating-score.dto";

export class ProductDto {
  @IsString()
  _id: string;

  @IsString()
  product_name: string;

  @IsString()
  model_no: string;

  @IsString()
  cat_id: string;

  @IsString()
  cat_name: string;

  @IsString()
  subcat_id: string;

  @IsString()
  subcat_name: string;

  @IsString()
  owner_id: string;

  @IsString()
  owner_username: string;

  @IsObject()
  product_img: object;

  @IsString()
  status: string;

  @IsDate()
  last_updated_on: Date;

  @IsString()
  reviewed_by: string;

  @IsString()
  admin_username: string;

  @IsDate()
  reviewed_on: Date;

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  rating: number;

  @IsNumber()
  total_score: number;

  @IsArray()
  specification: Array<ProductSpecificationDto>;

  @IsArray()
  rating_score: Array<SubcategoryRatingScoreDto>;

  @IsString()
  rejected_reason: string;
}