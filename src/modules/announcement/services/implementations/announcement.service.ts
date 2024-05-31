import { Injectable } from '@nestjs/common';
import { IAnnouncementService } from '../interfaces/announcement.service.interface';
import { Announcement } from '../../domain/schema/announcement.schema';
import { AnnouncementDto } from '../../dtos/announcement.dto';
import { AnnouncementRepository } from '../../domain/repositories/announcement.repository';

@Injectable()
export class AnnouncementService implements IAnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
  ) {}

  async createAnnouncement(announcementDto: AnnouncementDto): Promise<Announcement> {
    return this.announcementRepository.create({ ...announcementDto});
  }

  async editAnnouncement(id: string, announcementDto: AnnouncementDto): Promise<Announcement> {
    return this.announcementRepository.update(id, announcementDto);
  }

  async findAllAnnouncements(): Promise<Announcement[]> {
    return this.announcementRepository.findAll();
  }

  async findAllAnnouncementByFilter(filterDto): Promise<Announcement[]> {
    return this.announcementRepository.findAllByFilter(filterDto);
  }


}
