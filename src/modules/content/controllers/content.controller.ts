// Content controller

import { Body, Controller, Get, Param, Post, Put, Patch, Query, Delete } from '@nestjs/common';
import { CarouselDto } from '../dtos/carousel.dto';
import { ContentDto } from '../dtos/content.dto';
import { HistoryTimelineDto } from '../dtos/history-timeline.dto';
import { ContentService } from '../services/implementations/content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {
  }

  @Post('create-carousel')
  async createCarousel(@Body() carouselDto: CarouselDto) {
    return this.contentService.createCarousel(carouselDto);
  }

  @Get('find-all-carousel')
  async findAllCarousel():Promise<CarouselDto[]> {
    return this.contentService.findAllCarousel();
  }

  @Get('find-visible-carousel')
  async findVisibleCarousel():Promise<CarouselDto[]> {
    return this.contentService.findVisibleCarousel();
  }

  @Patch('update-carousel')
  async updateCarousel(@Query("id") id: string, @Body() carouselDto: CarouselDto) {
    return this.contentService.updateCarousel(id, carouselDto);
  }

  @Delete("delete-carousel")
  async deleteCarousel(@Query("id") id: string) {
    return await this.contentService.deleteCarousel(id);
  }

  @Post('create-content')
  async createContent(@Body() contentDto: ContentDto) {
    return this.contentService.createContent(contentDto);
  }

  @Get('find-all-content')
  async findAllContent():Promise<ContentDto[]> {
    return this.contentService.findAllContent();
  }

  @Get('find-visible-content')
  async findVisibleContent():Promise<ContentDto[]> {
    return this.contentService.findVisibleContent();
  }

  @Patch('update-content')
  async updateContent(@Query("id") id: string, @Body() contentDto: ContentDto) {
    return this.contentService.updateContent(id, contentDto);
  }

  @Delete("delete-content")
  async deleteContent(@Query("id") id: string) {
    return await this.contentService.deleteContent(id);
  }

  @Post('create-history-timeline')
  async createHistoryTimeline(@Body() historyTimelineDto: HistoryTimelineDto) {
    return this.contentService.createHistoryTimeline(historyTimelineDto);
  }

  @Get('find-all-history-timeline')
  async findAllHistoryTimeline():Promise<ContentDto[]> {
    return this.contentService.findAllHistoryTimeline();
  }

  @Get('find-visible-history-timeline')
  async findVisibleHistoryTimeline():Promise<ContentDto[]> {
    return this.contentService.findVisibleHistoryTimeline();
  }

  @Patch('update-history-timeline')
  async updateHistoryTimeline(@Query("id") id: string, @Body() historyTimelineDto: HistoryTimelineDto) {
    return this.contentService.updateHistoryTimeline(id, historyTimelineDto);
  }

  @Delete("delete-history-timeline")
  async deleteHistoryTimeline(@Query("id") id: string) {
    return await this.contentService.deleteHistoryTimeline(id);
  }
}
