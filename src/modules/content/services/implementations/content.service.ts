import { Injectable } from '@nestjs/common';
import { IContentService } from '../interfaces/content.service.interface';
import { CarouselDto } from '../../dtos/carousel.dto';
import { Carousel } from '../../domain/schema/carousel.schema';
import { CarouselRepository } from '../../domain/repositories/carousel.repository';
import { ContentDto } from '../../dtos/content.dto';
import { Content } from '../../domain/schema/content.schema';
import { ContentRepository } from '../../domain/repositories/content.repository';
import { HistoryTimelineDto } from '../../dtos/history-timeline.dto';
import { HistoryTimeline } from '../../domain/schema/history-timeline.schema';
import { HistoryTimelineRepository } from '../../domain/repositories/history-timeline.repository';

@Injectable()
export class ContentService implements IContentService {
  constructor(
    private readonly carouselRepository: CarouselRepository,
    private readonly contentRepository: ContentRepository,
    private readonly historyTimelineRepository: HistoryTimelineRepository,
  ) {}

  async createCarousel(carouselDto: CarouselDto):  Promise<Carousel>{
    return this.carouselRepository.create({ ...carouselDto});
  }

  async findAllCarousel(): Promise<Carousel[]> {
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
          localField: 'last_updated_by',
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
          last_updated_by: { $ifNull: ['$updater.username', '$last_updated_by'] },
        },
      },
      { $unset: ['creator', 'updater'] }
    ];
    return this.carouselRepository.aggregate(pipeline);
  }

  async updateCarousel(id: string, carouselDto: CarouselDto): Promise<Carousel> {
    return this.carouselRepository.update(id, {...carouselDto, last_updated_on: new Date()});
  }

  async deleteCarousel(id: string): Promise<Carousel> {
    return this.carouselRepository.delete(id);
  }

  async createContent(contentDto: ContentDto):  Promise<Content>{
    return this.contentRepository.create({ ...contentDto});
  }

  async findAllContent(): Promise<Content[]> {
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
          localField: 'last_updated_by',
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
          last_updated_by: { $ifNull: ['$updater.username', '$last_updated_by'] },
        },
      },
      { $unset: ['creator', 'updater'] }
    ];
    return this.contentRepository.aggregate(pipeline);
  }

  async updateContent(id: string, contentDto: ContentDto): Promise<Content> {
    return this.contentRepository.update(id, {...contentDto, last_updated_on: new Date()});
  }

  async deleteContent(id: string): Promise<Content> {
    return this.contentRepository.delete(id);
  }

  async createHistoryTimeline(historyTimelineDto: HistoryTimelineDto):  Promise<HistoryTimeline>{
    return this.historyTimelineRepository.create({ ...historyTimelineDto});
  }

  async findAllHistoryTimeline(): Promise<HistoryTimeline[]> {
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
          localField: 'last_updated_by',
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
          last_updated_by: { $ifNull: ['$updater.username', '$last_updated_by'] },
        },
      },
      { $unset: ['creator', 'updater'] }
    ];
    return this.historyTimelineRepository.aggregate(pipeline);
  }

  async updateHistoryTimeline(id: string, historyTimelineDto: HistoryTimelineDto): Promise<HistoryTimeline> {
    return this.historyTimelineRepository.update(id, {...historyTimelineDto, last_updated_on: new Date()});
  }

  async deleteHistoryTimeline(id: string): Promise<HistoryTimeline> {
    return this.historyTimelineRepository.delete(id);
  }
}
