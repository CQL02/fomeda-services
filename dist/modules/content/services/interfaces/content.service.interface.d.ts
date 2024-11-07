import { Carousel } from '../../domain/schema/carousel.schema';
import { Content } from '../../domain/schema/content.schema';
import { HistoryTimeline } from '../../domain/schema/history-timeline.schema';
import { CarouselDto } from '../../dtos/carousel.dto';
import { ContentDto } from "../../dtos/content.dto";
import { HistoryTimelineDto } from "../../dtos/history-timeline.dto";
export interface IContentService {
    createCarousel(carouselDto: CarouselDto): Promise<Carousel>;
    findAllCarousel(): Promise<Carousel[]>;
    updateCarousel(id: string, carouselDto: CarouselDto): Promise<Carousel>;
    deleteCarousel(id: string): Promise<Carousel>;
    createContent(contentDto: ContentDto): Promise<Content>;
    findAllContent(): Promise<Content[]>;
    updateContent(id: string, contentDto: ContentDto): Promise<Content>;
    deleteContent(id: string): Promise<Content>;
    createHistoryTimeline(historyTimelineDto: HistoryTimelineDto): Promise<HistoryTimeline>;
    findAllHistoryTimeline(): Promise<HistoryTimeline[]>;
    updateHistoryTimeline(id: string, historyTimelineDto: HistoryTimelineDto): Promise<HistoryTimeline>;
    deleteHistoryTimeline(id: string): Promise<HistoryTimeline>;
}
