import { IsDate, IsObject, IsString } from "class-validator";

export class ReportDto {
  @IsString()
  _id: string;

  @IsString()
  pro_id: string;

  @IsString()
  product_name: string;

  @IsString()
  model_no: string;

  @IsString()
  cat_name: string;

  @IsString()
  subcat_name: string;

  @IsString()
  rpt_title: string;

  @IsString()
  rpt_reason: string;

  @IsObject()
  rpt_img: object;

  @IsDate()
  created_on: Date;

  @IsString()
  sup_status: string;

  @IsString()
  adm_status: string;

  @IsDate()
  reviewed_on: Date;

  @IsString()
  reviewed_by: string;

  @IsString()
  reviewed_username: string;
}