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
export declare class ProductVerification extends SchemaAbstract {
    pro_id: string;
    product_name: string;
    model_no: string;
    subcat_id: string;
    owner_id: string;
    product_img: object;
    status: string;
    last_updated_on: Date;
    last_updated_by: string;
    rating: number;
    total_score: number;
    reviewed_by: string;
    reviewed_on: Date;
    rejected_reason: string;
}
export declare const ProductVerificationSchema: import("mongoose").Schema<ProductVerification, import("mongoose").Model<ProductVerification, any, any, any, import("mongoose").Document<unknown, any, ProductVerification> & ProductVerification & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductVerification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductVerification>> & import("mongoose").FlatRecord<ProductVerification> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
