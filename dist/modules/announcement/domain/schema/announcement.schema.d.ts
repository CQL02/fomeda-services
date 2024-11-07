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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { SchemaAbstract } from '../../../../common/database/abstracts/schema.abstract';
import { Types } from 'mongoose';
export declare class Announcement extends SchemaAbstract {
    _id: Types.ObjectId;
    title: string;
    description: string;
    file_uploaded: [];
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    visibility: boolean;
}
export declare const AnnouncementSchema: import("mongoose").Schema<Announcement, import("mongoose").Model<Announcement, any, any, any, import("mongoose").Document<unknown, any, Announcement> & Announcement & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Announcement, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Announcement>> & import("mongoose").FlatRecord<Announcement> & Required<{
    _id: Types.ObjectId;
}>>;
