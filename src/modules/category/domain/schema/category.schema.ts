import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';

@Schema({ versionKey: false, collection: 'category' })
export class Category extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
    maxlength: 12,
  })
  cat_code: string;

  @Prop({
    required: true,
    type: String,
  })
  cat_name: string;

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

export const CategorySchema = SchemaFactory.createForClass(Category);
