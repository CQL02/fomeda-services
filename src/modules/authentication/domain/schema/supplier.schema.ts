import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'supplier' })
export class Supplier extends Document {
  @Prop({
    required: true,
    type: String,
  })
  user_id: string;

  @Prop({
    required: true,
    type: String,
  })
  company_name: string;

  @Prop({
    required: true,
    type: String,
  })
  company_no: string;

  @Prop({
    required: true,
    type: String,
  })
  company_address: string;

  @Prop({
    required: true,
    type: Date,
    default: Date.now,
  })
  registered_on: Date;

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
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
