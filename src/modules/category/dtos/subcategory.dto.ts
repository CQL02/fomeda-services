import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty, IsArray
} from "class-validator";
import { SubcategoryRatingScoreDto } from "./subcategory-rating-score.dto";

export class SubcategoryDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  cat_id: string;

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

  @IsArray()
  rating_score: SubcategoryRatingScoreDto[];
}
