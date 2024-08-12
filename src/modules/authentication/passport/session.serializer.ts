import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SessionService } from '../services/implementations/session.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly sessionService: SessionService) {
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
      done(null, { user_id: userId });
    }
  }
}