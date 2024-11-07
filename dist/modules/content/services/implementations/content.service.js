"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const carousel_repository_1 = require("../../domain/repositories/carousel.repository");
const content_repository_1 = require("../../domain/repositories/content.repository");
const history_timeline_repository_1 = require("../../domain/repositories/history-timeline.repository");
let ContentService = class ContentService {
    constructor(carouselRepository, contentRepository, historyTimelineRepository) {
        this.carouselRepository = carouselRepository;
        this.contentRepository = contentRepository;
        this.historyTimelineRepository = historyTimelineRepository;
    }
    async createCarousel(carouselDto) {
        return this.carouselRepository.create({ ...carouselDto });
    }
    async findAllCarousel() {
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
    async findVisibleCarousel() {
        return this.carouselRepository.findAllByFilter({}, { image: 1 });
    }
    async updateCarousel(id, carouselDto) {
        return this.carouselRepository.update(id, { ...carouselDto, last_updated_on: new Date() });
    }
    async deleteCarousel(id) {
        return this.carouselRepository.delete(id);
    }
    async createContent(contentDto) {
        return this.contentRepository.create({ ...contentDto });
    }
    async findAllContent() {
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
    async findVisibleContent() {
        return this.contentRepository.findAllByFilter({}, { title: 1, description: 1 });
    }
    async updateContent(id, contentDto) {
        return this.contentRepository.update(id, { ...contentDto, last_updated_on: new Date() });
    }
    async deleteContent(id) {
        return this.contentRepository.delete(id);
    }
    async createHistoryTimeline(historyTimelineDto) {
        return this.historyTimelineRepository.create({ ...historyTimelineDto });
    }
    async findAllHistoryTimeline() {
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
    async findVisibleHistoryTimeline() {
        return this.historyTimelineRepository.findAllByFilter({}, { title: 1, description: 1, date: 1 });
    }
    async updateHistoryTimeline(id, historyTimelineDto) {
        return this.historyTimelineRepository.update(id, { ...historyTimelineDto, last_updated_on: new Date() });
    }
    async deleteHistoryTimeline(id) {
        return this.historyTimelineRepository.delete(id);
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [carousel_repository_1.CarouselRepository,
        content_repository_1.ContentRepository,
        history_timeline_repository_1.HistoryTimelineRepository])
], ContentService);
//# sourceMappingURL=content.service.js.map