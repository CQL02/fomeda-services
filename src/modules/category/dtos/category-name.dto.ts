import { IsString } from "class-validator";

export class CategoryNameDto {
  @IsString()
  cat_id?: string;

  @IsString()
  subcat_id?: string;

  @IsString()
  cat_name: string;

  @IsString()
  subcat_name?: string;
}