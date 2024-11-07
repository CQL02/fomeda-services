import { PassportSerializer } from '@nestjs/passport';
import { ISessionService } from '../services/interfaces/session.service.interface';
export declare class SessionSerializer extends PassportSerializer {
    private readonly sessionService;
    constructor(sessionService: ISessionService);
    serializeUser(user: any, done: (err: Error, user: any) => void): Promise<any>;
    deserializeUser(sessionId: string, done: (err: Error, user: any) => void): Promise<any>;
}
