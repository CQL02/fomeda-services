import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carousel, CarouselSchema } from './domain/schema/carousel.schema';
import { Content, ContentSchema } from './domain/schema/content.schema';
import { HistoryTimeline, HistoryTimelineSchema } from './domain/schema/history-timeline.schema';

import { CarouselRepository } from './domain/repositories/carousel.repository';
import { ContentRepository } from './domain/repositories/content.repository';
import { HistoryTimelineRepository } from './domain/repositories/history-timeline.repository';

import { ContentController } from './controllers/content.controller';
import { ContentService } from './services/implementations/content.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carousel.name, schema: CarouselSchema },
      { name: Content.name, schema: ContentSchema },
      { name: HistoryTimeline.name, schema: HistoryTimelineSchema },
    ]),
  ],
  providers: [ContentService, CarouselRepository, ContentRepository, HistoryTimelineRepository],
  controllers: [ContentController],
})

export class ContentModule {}
