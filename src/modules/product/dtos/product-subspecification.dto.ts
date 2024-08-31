import { IsNumber, IsString } from "class-validator";

export class ProductSubspecificationDto {
  @IsString()
  subspec_id: string;

  @IsString()
  subspec_desc: string;

  @IsNumber()
  score: number;
}