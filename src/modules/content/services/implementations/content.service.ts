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
    return this.carouselRepository.findAll();
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
    return this.contentRepository.findAll();
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
    return this.historyTimelineRepository.findAll();
  }

  async updateHistoryTimeline(id: string, historyTimelineDto: HistoryTimelineDto): Promise<HistoryTimeline> {
    return this.historyTimelineRepository.update(id, {...historyTimelineDto, last_updated_on: new Date()});
  }

  async deleteHistoryTimeline(id: string): Promise<HistoryTimeline> {
    return this.historyTimelineRepository.delete(id);
  }
}
