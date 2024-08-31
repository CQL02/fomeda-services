import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";
import { ProductSubspecification } from "./product-subspecification.schema";

@Schema({versionKey: false, collection: 'product_specification'})
export class ProductSpecification extends SchemaAbstract {
  @Prop({
    required: true,
    type: String,
  })
  pro_id: string;

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

export const ProductSpecificationSchema = SchemaFactory.createForClass(ProductSpecification);