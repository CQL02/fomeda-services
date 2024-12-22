import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { SessionService } from '../services/implementations/session.service';
import { ISessionService } from '../services/interfaces/session.service.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(SessionService.name) private readonly sessionService: ISessionService) {
    super();
  }

  async serializeUser(user: any, done: (err: Error, user: any) => void): Promise<any> {
    const existingSession = await this.sessionService.findSessionByUserId(user.user_id);
    let sessionId: string;

    if (existingSession) {
      sessionId = await this.sessionService.updateSession(existingSession?.session_id);
    } else {
      sessionId = await this.sessionService.createSession(user.user_id);
    }

    done(null, sessionId);
  }

  async deserializeUser(sessionId: string, done: (err: Error, user: any) => void): Promise<any> {
    const userId = await this.sessionService.validateSession(sessionId);

    if (!userId) {
      done(null, null);
    } else {
      done(null, userId);
    }
  }
}