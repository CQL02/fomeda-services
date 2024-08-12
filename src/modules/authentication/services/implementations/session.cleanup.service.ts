import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SessionService } from './session.service';

@Injectable()
export class SessionCleanupService {
  constructor(private readonly sessionService: SessionService) {}

  @Cron('*/10 * * * *')
  async handleCron() {
    await this.sessionService.deleteExpiredSessions();
    console.log('Expired sessions cleaned up');
  }
}
