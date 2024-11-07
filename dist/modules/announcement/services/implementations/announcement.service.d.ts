import { IAnnouncementService } from '../interfaces/announcement.service.interface';
import { Announcement } from '../../domain/schema/announcement.schema';
import { AnnouncementDto } from '../../dtos/announcement.dto';
import { AnnouncementRepository } from '../../domain/repositories/announcement.repository';
export declare class AnnouncementService implements IAnnouncementService {
    private readonly announcementRepository;
    constructor(announcementRepository: AnnouncementRepository);
    createAnnouncement(announcementDto: AnnouncementDto): Promise<Announcement>;
    editAnnouncement(id: string, announcementDto: AnnouncementDto): Promise<Announcement>;
    findAllAnnouncements(): Promise<Announcement[]>;
    findVisibleAnnouncement(filterDto: any): Promise<Announcement[]>;
}
