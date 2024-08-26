import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';
import { RatingScore } from "./rating_score.schema";

@Schema({ versionKey: false, collection: 'category_base_subspecification' })
export class CategoryBaseSubspecification extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  subcat_spec_id: string;

  @Prop({
    required: true,
    type: String,
  })
  subcat_subspec_name: string;

  @Prop({
    required: true,
    type: String,
  })
  created_by: string;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  created_on: Date;

  @Prop({
    required: true,
    type: String,
  })
  last_updated_by: string;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  last_updated_on: Date;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  is_active: boolean;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  allow_input: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_required: boolean;

  @Prop({
    type: String,
  })
  prefix: string;

  @Prop({
    type: String,
  })
  suffix: string;

  @Prop({
    type: String,
  })
  field_type: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_score_contributed: boolean;

  @Prop({
    type: [RatingScore],
  })
  rating_score: RatingScore[];
}

export const CategoryBaseSubspecificationSchema = SchemaFactory.createForClass(
  CategoryBaseSubspecification,
);
