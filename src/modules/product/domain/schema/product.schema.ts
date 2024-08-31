import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";

@Schema({versionKey: false, collection: 'product'})
export class Product extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  product_name: string;

  @Prop({
    required: true,
    type: String,
  })
  cat_id: string;

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
  approved_by: string;

  @Prop({
    type: Date,
  })
  approved_on: Date;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  is_active: boolean;

  @Prop({
    type: Number,
  })
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);