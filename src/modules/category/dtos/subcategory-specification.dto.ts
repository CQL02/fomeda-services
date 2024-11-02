import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty, IsArray
} from "class-validator";
import { SubcategorySubspecificationDto } from "./subcategory-subspecification.dto";
import { RatingScoreDto } from "./rating-score.dto";

export class SubcategorySpecificationDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  subcat_id: string;

  @IsString()
  @IsNotEmpty()
  cat_type: string;

  @IsString()
  @IsNotEmpty()
  subcat_spec_name: string;

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

  @IsBoolean()
  allow_input: boolean;

  @IsArray()
  children: Array<SubcategorySubspecificationDto>;

  @IsBoolean()
  is_origin: boolean;

  @IsBoolean()
  is_required: boolean;

  @IsString()
  prefix: string;

  @IsString()
  suffix: string;

  @IsString()
  field_type: string;

  @IsBoolean()
  is_score_contributed: boolean;

  @IsArray()
  rating_score: Array<RatingScoreDto>;
}
