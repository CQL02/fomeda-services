import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";
import { ReportConstant } from "../../../../common/constant/report.constant";

@Schema({versionKey: false, collection: 'report'})
export class Report extends SchemaAbstract{
  @Prop({
    required: true,
    type: String,
  })
  pro_id: string;

  @Prop({
    required: true,
    type: String,
  })
  rpt_title: string;

  @Prop({
    required: true,
    type: String,
  })
  rpt_reason: string;

  @Prop({
    type: Object,
  })
  rpt_img: object;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  created_on: Date;

  @Prop({
    type: String,
  })
  sup_status: string;

  @Prop({
    required: true,
    type: String,
    default: ReportConstant.PENDING,
  })
  adm_status: string;

  @Prop({
    type: Date,
  })
  reviewed_on: Date;

  @Prop({
    type: String,
  })
  reviewed_by: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);