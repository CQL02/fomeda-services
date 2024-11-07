import { Session } from '../../domain/schema/session.schema';
export interface ISessionService {
    findSessionByUserId(userId: string): Promise<Session | null>;
    findSessionIdByUserId(userId: string): Promise<string>;
    createSession(userId: string): Promise<string>;
    updateSession(sessionId: string): Promise<string>;
    validateSession(sessionId: string): Promise<string | null>;
    deleteSession(sessionId: string): Promise<void>;
    deleteExpiredSessions(): Promise<void>;
}
