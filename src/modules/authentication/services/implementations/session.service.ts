import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { Session } from '../../domain/schema/session.schema';
import { ISessionService } from '../interfaces/session.service.interface';

@Injectable()
export class SessionService implements ISessionService {
  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async findSessionByUserId(userId: string): Promise<Session | null> {
    return this.sessionModel.findOne({ user_id: userId });
  }

  async findSessionIdByUserId(userId: string): Promise<string> {
    const result = await this.sessionModel.findOne({ user_id: userId });
    return result?.session_id;
  }

  async createSession(userId: string): Promise<string> {
    const sessionId = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const sessionData = {
      session_id: sessionId,
      user_id: userId,
      created_at: new Date(),
      expires_at: expiresAt,
    }
    await this.sessionModel.create(sessionData);
    return sessionId;
  }

  async updateSession(sessionId: string): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);
    await this.sessionModel.updateOne(
      { session_id: sessionId },
      { expires_at: expiresAt }
    );
    return sessionId;
  }

  async validateSession(sessionId: string): Promise<string | null> {
    const session = await this.sessionModel.findOne({ session_id: sessionId });
    if (session && session.expires_at > new Date()) {
      return session.user_id;
    }
    return null;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.sessionModel.deleteOne({ session_id: sessionId });
  }

  async deleteExpiredSessions(): Promise<void> {
    await this.sessionModel.deleteMany({ expires_at: { $lt: new Date() } });
  }
}
