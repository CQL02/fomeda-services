import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'announcement' })
export class Announcement extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
    default: uuidv4,
    unique: true,
  })
  _id: Types.ObjectId;

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
    type: Array,
  })
  file_uploaded:[];

  @Prop({
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
    type: Date,
    default: Date.now,
  })
  updated_on: Date;

  @Prop({
    required: true,
    type: String,
  })
  updated_by: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  visibility: boolean;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
