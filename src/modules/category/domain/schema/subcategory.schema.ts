import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';
import { SubcategoryRatingScore } from "./subcategory-rating-score.schema";

@Schema({ versionKey: false, collection: 'subcategory' })
export class Subcategory extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  cat_id: string;

  @Prop({
    required: true,
    type: String,
  })
  subcat_name: string;

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
    type: [SubcategoryRatingScore],
  })
  rating_score: SubcategoryRatingScore[];
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
