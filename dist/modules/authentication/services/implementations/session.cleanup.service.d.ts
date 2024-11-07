import { SessionService } from './session.service';
export declare class SessionCleanupService {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    handleCron(): Promise<void>;
}
