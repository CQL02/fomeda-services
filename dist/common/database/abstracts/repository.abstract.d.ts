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
import { Model, Document } from 'mongoose';
export declare abstract class AbstractRepository<T extends Document> {
    protected readonly model: Model<T>;
    protected constructor(model: Model<T>);
    create(createDto: any): Promise<T>;
    findAll(): Promise<T[]>;
    findAllByFilter(filterDto: any, projection?: {}): Promise<T[]>;
    findOneById(id: string): Promise<T>;
    findOneByFilter(filterDto: any, projection?: {}): Promise<T>;
    update(id: string, updateDto: any): Promise<T>;
    updateOneByFilter(filterDto: any, updateDto: any): Promise<T>;
    delete(id: string): Promise<T>;
    aggregate(pipeline: any): Promise<any>;
}
