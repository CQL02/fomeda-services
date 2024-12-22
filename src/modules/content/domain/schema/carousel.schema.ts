import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'content_carousel' })
export class Carousel extends Document {
  @Prop({
    required: true,
    type: Object,
  })
  image: object;

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

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
