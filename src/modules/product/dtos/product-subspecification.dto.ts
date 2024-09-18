import { IsArray, IsNumber, IsString } from "class-validator";
import { RatingScoreDto } from "../../category/dtos/rating-score.dto";

export class ProductSubspecificationDto {
  @IsString()
  spec_id: string;

  @IsString()
  subspec_id: string;

  @IsString()
  subspec_name: string;

  @IsString()
  subspec_desc: string;

  @IsString()
  prefix: string;

  @IsString()
  suffix: string;

  @IsNumber()
  score: number;

  @IsArray()
  rating_score: Array<RatingScoreDto>;
}