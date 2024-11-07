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
import { Model } from 'mongoose';
import { Session } from '../../domain/schema/session.schema';
import { ISessionService } from '../interfaces/session.service.interface';
export declare class SessionService implements ISessionService {
    private readonly sessionModel;
    constructor(sessionModel: Model<Session>);
    findSessionByUserId(userId: string): Promise<Session | null>;
    findSessionIdByUserId(userId: string): Promise<string>;
    createSession(userId: string): Promise<string>;
    updateSession(sessionId: string): Promise<string>;
    validateSession(sessionId: string): Promise<string | null>;
    deleteSession(sessionId: string): Promise<void>;
    deleteExpiredSessions(): Promise<void>;
}
