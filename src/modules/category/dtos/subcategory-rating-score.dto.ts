import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SubcategoryRatingScoreDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  max_value: string;

  @IsNumber()
  min_value: number;

  @IsDate()
  last_updated_on: Date;

  @IsString()
  last_updated_by: string;
}