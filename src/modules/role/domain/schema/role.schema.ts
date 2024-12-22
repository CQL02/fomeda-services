import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'role' })
export class Role extends Document {
  @Prop({
    required: true,
    type: String,
  })
  role_name: string;

  @Prop({
    required: true,
    type: [String],
  })
  modules: string[];

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  is_active: boolean;

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
  last_updated_on: Date;

  @Prop({
    required: true,
    type: String,
  })
  last_updated_by: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
