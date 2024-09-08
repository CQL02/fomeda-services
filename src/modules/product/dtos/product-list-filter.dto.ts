import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ProductListFilterDto {
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  status: string;

  @IsArray()
  cat_ids: string[];

  @IsString()
  search: string;
}