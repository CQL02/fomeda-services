import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'sequence' })
export class Sequence extends Document {
  @Prop({ required: true, unique: true })
  prefix: string;

  @Prop({ required: true, default: 0 })
  sequence_value: number;
}

export const SequenceSchema = SchemaFactory.createForClass(Sequence);
