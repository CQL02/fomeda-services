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
    return this.announcementRepository.update(id, {...announcementDto, updated_on: new Date()});
  }

  async findAllAnnouncements(): Promise<Announcement[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'user',
          localField: 'created_by',
          foreignField: 'user_id',
          as: 'creator',
        },
      },
      {
        $unwind: {
          path: '$creator',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'updated_by',
          foreignField: 'user_id',
          as: 'updater',
        },
      },
      {
        $unwind: {
          path: '$updater',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          created_by: { $ifNull: ['$creator.username', '$created_by'] },
          updated_by: { $ifNull: ['$updater.username', '$updated_by'] },
        },
      },
      { $unset: ['creator', 'updater'] }
    ];
    return await this.announcementRepository.aggregate(pipeline);
  }

  async findVisibleAnnouncement(filterDto): Promise<Announcement[]> {
    return this.announcementRepository.findAllByFilter(filterDto, {title: 1, description: 1, file_uploaded: 1, created_on: 1});
  }


}
