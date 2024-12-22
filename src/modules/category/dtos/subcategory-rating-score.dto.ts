import {IsNotEmpty, IsNumber } from "class-validator";

export class SubcategoryRatingScoreDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  max_value: string;

  @IsNumber()
  min_value: number;
}