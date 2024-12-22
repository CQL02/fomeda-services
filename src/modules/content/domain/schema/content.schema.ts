import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'content' })
export class Content extends Document {
  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

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
  created_by: string;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  last_updated_on: Date;

  @Prop({
    required: true,
    type: String,
  })
  last_updated_by: string;

}

export const ContentSchema = SchemaFactory.createForClass(Content);
