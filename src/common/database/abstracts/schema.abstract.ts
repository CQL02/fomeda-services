import { Document, Types } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class SchemaAbstract extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;
}
