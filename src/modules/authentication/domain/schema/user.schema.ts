import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'user' })
export class User extends Document {
  @Prop({
    required: true,
    type: String,
    default: () => uuidv4(),
    unique: true,
  })
  user_id: string

  @Prop({
    required: true,
    type: String,
  })
  fullname: string;

  @Prop({
    required: true,
    type: String,
    minlength: [6, "The username cannot be less than 6 characters"],
    maxlength: [20, "The username cannot be more than 20 characters"],
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  email_address: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  is_active: boolean;

  @Prop({
    required: true,
    type: String,
  })
  type: string;

  @Prop({
    // required: true,
    type: String,
  })
  role_id: string;

  @Prop({
    type: String,
  })
  status: string;


  @Prop({
    type: Boolean,
  })
  deleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
