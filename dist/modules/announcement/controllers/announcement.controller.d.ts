import { AnnouncementDto } from '../dtos/announcement.dto';
import { AnnouncementService } from '../services/implementations/announcement.service';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    getAllAnnouncement(): Promise<import("../domain/schema/announcement.schema").Announcement[]>;
    getVisibleAnnouncement(): Promise<import("../domain/schema/announcement.schema").Announcement[]>;
    createAnnouncement(announcementDto: AnnouncementDto): Promise<import("../domain/schema/announcement.schema").Announcement>;
    editAnnouncement(id: string, announcementDto: AnnouncementDto): Promise<import("../domain/schema/announcement.schema").Announcement>;
}
