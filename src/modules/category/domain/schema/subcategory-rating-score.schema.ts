import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class SubcategoryRatingScore {
  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true, type: Number, default: 0 })
  min_score: number;

  @Prop({ required: true, type: Number, default: 0 })
  max_score: number;
}
