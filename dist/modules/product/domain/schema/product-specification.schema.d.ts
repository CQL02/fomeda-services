/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { SchemaAbstract } from "../../../../common/database/abstracts/schema.abstract";
import { ProductSubspecification } from "./product-subspecification.schema";
export declare class ProductSpecification extends SchemaAbstract {
    pro_id: string;
    spec_id: string;
    spec_desc: string;
    score: number;
    subspecification: ProductSubspecification[];
}
export declare const ProductSpecificationSchema: import("mongoose").Schema<ProductSpecification, import("mongoose").Model<ProductSpecification, any, any, any, import("mongoose").Document<unknown, any, ProductSpecification> & ProductSpecification & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductSpecification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductSpecification>> & import("mongoose").FlatRecord<ProductSpecification> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
