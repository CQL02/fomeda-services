import { Announcement } from '../../domain/schema/announcement.schema';
import { AnnouncementDto } from "../../dtos/announcement.dto";
export interface IAnnouncementService {
    createAnnouncement(announcementDto: AnnouncementDto): Promise<Announcement>;
    findAllAnnouncements(): Promise<Announcement[]>;
    findVisibleAnnouncement(filterDto: any): Promise<Announcement[]>;
}
