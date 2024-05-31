import { IsString } from "class-validator";

export class CategoryNameDto {
  @IsString()
  cat_name: string;

  @IsString()
  subcat_name: string;
}