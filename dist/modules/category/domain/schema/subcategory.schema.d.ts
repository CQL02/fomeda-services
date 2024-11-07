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
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';
import { SubcategoryRatingScore } from "./subcategory-rating-score.schema";
export declare class Subcategory extends SchemaAbstract {
    cat_id: string;
    subcat_name: string;
    created_by: string;
    created_on: Date;
    last_updated_by: string;
    last_updated_on: Date;
    is_active: boolean;
    rating_score: SubcategoryRatingScore[];
}
export declare const SubcategorySchema: import("mongoose").Schema<Subcategory, import("mongoose").Model<Subcategory, any, any, any, import("mongoose").Document<unknown, any, Subcategory> & Subcategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subcategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Subcategory>> & import("mongoose").FlatRecord<Subcategory> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
