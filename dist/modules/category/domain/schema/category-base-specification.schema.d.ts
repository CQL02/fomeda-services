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
import { RatingScore } from "./rating_score.schema";
export declare class CategoryBaseSpecification extends SchemaAbstract {
    cat_id: string;
    cat_type: string;
    subcat_spec_name: string;
    created_by: string;
    created_on: Date;
    last_updated_by: string;
    last_updated_on: Date;
    is_active: boolean;
    allow_input: boolean;
    is_required: boolean;
    prefix: string;
    suffix: string;
    field_type: string;
    is_score_contributed: boolean;
    rating_score: RatingScore[];
}
export declare const CategoryBaseSpecificationSchema: import("mongoose").Schema<CategoryBaseSpecification, import("mongoose").Model<CategoryBaseSpecification, any, any, any, import("mongoose").Document<unknown, any, CategoryBaseSpecification> & CategoryBaseSpecification & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CategoryBaseSpecification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CategoryBaseSpecification>> & import("mongoose").FlatRecord<CategoryBaseSpecification> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
