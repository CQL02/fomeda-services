import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';

@Schema({ versionKey: false, collection: 'category_type' })
export class CategoryType extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  cat_type: string;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  allow_sub: string;

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
}

export const CategoryTypeSchema = SchemaFactory.createForClass(CategoryType);
