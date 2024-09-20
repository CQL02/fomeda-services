import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";

@Schema({versionKey: false, collection: 'product_verification'})
export class ProductVerification extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  pro_id: string;

  @Prop({
    required: true,
    type: String,
  })
  product_name: string;

  @Prop({
    required: true,
    type: String,
  })
  model_no: string;

  @Prop({
    required: true,
    type: String,
  })
  subcat_id: string;

  @Prop({
    required: true,
    type: String,
  })
  owner_id: string;

  @Prop({
    type: Object,
  })
  product_img: object;

  @Prop({
    required: true,
    type: String,
  })
  status: string;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  last_updated_on: Date;

  @Prop({
    type: String,
  })
  last_updated_by: string;

  @Prop({
    type: Number,
  })
  rating: number;

  @Prop({
    type: Number,
  })
  total_score: number;

  @Prop({
    type: String,
  })
  reviewed_by: string;

  @Prop({
    type: Date,
  })
  reviewed_on: Date;

  @Prop({
    type: String,
  })
  rejected_reason: string;
}

export const ProductVerificationSchema = SchemaFactory.createForClass(ProductVerification);