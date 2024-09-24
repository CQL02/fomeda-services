import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RatingScoreDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  value: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}