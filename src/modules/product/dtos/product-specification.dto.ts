import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductSubspecificationDto } from "./product-subspecification.dto";
import { RatingScoreDto } from "../../category/dtos/rating-score.dto";

export class ProductSpecificationDto {
  @IsString()
  @IsNotEmpty()
  pro_id: string;

  @IsString()
  @IsNotEmpty()
  spec_id: string;

  @IsString()
  spec_name: string;

  @IsString()
  spec_desc: string;

  @IsString()
  spec_type: string;

  @IsString()
  prefix: string;

  @IsString()
  suffix: string;

  @IsNumber()
  score: number;

  @IsArray()
  rating_score: Array<RatingScoreDto>;

  @IsArray()
  subspecification: Array<ProductSubspecificationDto>;
}