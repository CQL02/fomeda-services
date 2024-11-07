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
import { Document } from 'mongoose';
export declare class HistoryTimeline extends Document {
    title: string;
    description: string;
    date: string;
    created_on: Date;
    created_by: string;
    last_updated_on: Date;
    last_updated_by: string;
}
export declare const HistoryTimelineSchema: import("mongoose").Schema<HistoryTimeline, import("mongoose").Model<HistoryTimeline, any, any, any, Document<unknown, any, HistoryTimeline> & HistoryTimeline & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HistoryTimeline, Document<unknown, {}, import("mongoose").FlatRecord<HistoryTimeline>> & import("mongoose").FlatRecord<HistoryTimeline> & Required<{
    _id: unknown;
}>>;
