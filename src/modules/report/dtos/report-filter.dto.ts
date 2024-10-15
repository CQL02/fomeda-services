import { IsArray, IsString } from "class-validator";

export class ReportFilterDto {
  @IsArray()
  subcat_ids: string[];

  @IsString()
  search: string;

  @IsArray()
  adm_status_list: string[];

  @IsArray()
  sup_status_list: string[];
}