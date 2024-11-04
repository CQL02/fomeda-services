import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'otp' })
export class Otp extends Document {
  @Prop({
    type: String,
  })
  type: string;

  @Prop({
    required: true,
    type: String,
  })
  user_email: string;

  @Prop({
    required: true,
    type: String,
  })
  otp: string;

  @Prop({
    required: true,
    type: Date,
    index: { expires: '5m' }
  })
  expiration: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_used: boolean;

}

export const OtpSchema = SchemaFactory.createForClass(Otp);
