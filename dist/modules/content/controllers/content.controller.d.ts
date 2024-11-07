import { CarouselDto } from '../dtos/carousel.dto';
import { ContentDto } from '../dtos/content.dto';
import { HistoryTimelineDto } from '../dtos/history-timeline.dto';
import { ContentService } from '../services/implementations/content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    createCarousel(carouselDto: CarouselDto): Promise<import("../domain/schema/carousel.schema").Carousel>;
    findAllCarousel(): Promise<CarouselDto[]>;
    findVisibleCarousel(): Promise<CarouselDto[]>;
    updateCarousel(id: string, carouselDto: CarouselDto): Promise<import("../domain/schema/carousel.schema").Carousel>;
    deleteCarousel(id: string): Promise<import("../domain/schema/carousel.schema").Carousel>;
    createContent(contentDto: ContentDto): Promise<import("../domain/schema/content.schema").Content>;
    findAllContent(): Promise<ContentDto[]>;
    findVisibleContent(): Promise<ContentDto[]>;
    updateContent(id: string, contentDto: ContentDto): Promise<import("../domain/schema/content.schema").Content>;
    deleteContent(id: string): Promise<import("../domain/schema/content.schema").Content>;
    createHistoryTimeline(historyTimelineDto: HistoryTimelineDto): Promise<import("../domain/schema/history-timeline.schema").HistoryTimeline>;
    findAllHistoryTimeline(): Promise<ContentDto[]>;
    findVisibleHistoryTimeline(): Promise<ContentDto[]>;
    updateHistoryTimeline(id: string, historyTimelineDto: HistoryTimelineDto): Promise<import("../domain/schema/history-timeline.schema").HistoryTimeline>;
    deleteHistoryTimeline(id: string): Promise<import("../domain/schema/history-timeline.schema").HistoryTimeline>;
}
