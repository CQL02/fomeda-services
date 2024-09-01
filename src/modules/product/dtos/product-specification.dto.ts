import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductSubspecificationDto } from "./product-subspecification.dto";

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

  @IsNumber()
  score: number;

  @IsArray()
  subspecification: Array<ProductSubspecificationDto>;
}