import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class RatingScore {
  @Prop({ required: true, type: String })
  action: string;

  @Prop({ required: true, type: String })
  value: string;

  @Prop({ required: true, type: Number })
  score: number;
}
