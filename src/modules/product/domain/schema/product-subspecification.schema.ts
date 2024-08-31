import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";

@Schema()
export class ProductSubspecification extends SchemaAbstract {

  @Prop({
    type: String,
  })
  subspec_id: string;

  @Prop({
    type: String,
  })
  subspec_desc: string;

  @Prop({
    type: Number,
  })
  score: number;
}

