import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";
import { ProductSubspecification } from "./product-subspecification.schema";

@Schema({versionKey: false, collection: 'product_verification_specification'})
export class ProductVerificationSpecification extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  verification_id: string;

  @Prop({
    type: String,
  })
  spec_id: string;

  @Prop({
    type: String,
  })
  spec_desc: string;

  @Prop({
    type: Number,
  })
  score: number;

  @Prop({
    type: [ProductSubspecification]
  })
  subspecification: ProductSubspecification[];
}

export const ProductVerificationSpecificationSchema = SchemaFactory.createForClass(ProductVerificationSpecification);