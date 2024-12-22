import { IsArray, IsString } from "class-validator";

export class ConsumerProductFilterDto {
  @IsArray()
  subcat_id?: string;

  @IsString()
  search?: string;

  @IsArray()
  specification?: SpecificationFilter[];

  @IsArray()
  subspecification?: SubspecificationFilter[]
}

class SpecificationFilter {
  @IsString()
  spec_id?: string;

  @IsString()
  spec_name?: string;

  @IsString()
  spec_type: string;

  @IsString()
  field_type: string;

  @IsArray()
  desc_list?: string[];

  @IsString()
  prefix?: string;

  @IsString()
  suffix?: string;
}

class SubspecificationFilter {
  @IsString()
  spec_id?: string;

  @IsString()
  subspec_id?: string;

  @IsString()
  subspec_name?: string;

  @IsArray()
  desc_list?: string[];

  @IsString()
  field_type: string;

  @IsString()
  prefix?: string;

  @IsString()
  suffix?: string;
}
