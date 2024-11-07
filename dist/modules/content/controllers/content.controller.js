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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const carousel_dto_1 = require("../dtos/carousel.dto");
const content_dto_1 = require("../dtos/content.dto");
const history_timeline_dto_1 = require("../dtos/history-timeline.dto");
const content_service_1 = require("../services/implementations/content.service");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    async createCarousel(carouselDto) {
        return this.contentService.createCarousel(carouselDto);
    }
    async findAllCarousel() {
        return this.contentService.findAllCarousel();
    }
    async findVisibleCarousel() {
        return this.contentService.findVisibleCarousel();
    }
    async updateCarousel(id, carouselDto) {
        return this.contentService.updateCarousel(id, carouselDto);
    }
    async deleteCarousel(id) {
        return await this.contentService.deleteCarousel(id);
    }
    async createContent(contentDto) {
        return this.contentService.createContent(contentDto);
    }
    async findAllContent() {
        return this.contentService.findAllContent();
    }
    async findVisibleContent() {
        return this.contentService.findVisibleContent();
    }
    async updateContent(id, contentDto) {
        return this.contentService.updateContent(id, contentDto);
    }
    async deleteContent(id) {
        return await this.contentService.deleteContent(id);
    }
    async createHistoryTimeline(historyTimelineDto) {
        return this.contentService.createHistoryTimeline(historyTimelineDto);
    }
    async findAllHistoryTimeline() {
        return this.contentService.findAllHistoryTimeline();
    }
    async findVisibleHistoryTimeline() {
        return this.contentService.findVisibleHistoryTimeline();
    }
    async updateHistoryTimeline(id, historyTimelineDto) {
        return this.contentService.updateHistoryTimeline(id, historyTimelineDto);
    }
    async deleteHistoryTimeline(id) {
        return await this.contentService.deleteHistoryTimeline(id);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Post)('create-carousel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [carousel_dto_1.CarouselDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createCarousel", null);
__decorate([
    (0, common_1.Get)('find-all-carousel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findAllCarousel", null);
__decorate([
    (0, common_1.Get)('find-visible-carousel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findVisibleCarousel", null);
__decorate([
    (0, common_1.Patch)('update-carousel'),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, carousel_dto_1.CarouselDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateCarousel", null);
__decorate([
    (0, common_1.Delete)("delete-carousel"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteCarousel", null);
__decorate([
    (0, common_1.Post)('create-content'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_dto_1.ContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createContent", null);
__decorate([
    (0, common_1.Get)('find-all-content'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findAllContent", null);
__decorate([
    (0, common_1.Get)('find-visible-content'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findVisibleContent", null);
__decorate([
    (0, common_1.Patch)('update-content'),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, content_dto_1.ContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateContent", null);
__decorate([
    (0, common_1.Delete)("delete-content"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteContent", null);
__decorate([
    (0, common_1.Post)('create-history-timeline'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [history_timeline_dto_1.HistoryTimelineDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createHistoryTimeline", null);
__decorate([
    (0, common_1.Get)('find-all-history-timeline'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findAllHistoryTimeline", null);
__decorate([
    (0, common_1.Get)('find-visible-history-timeline'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findVisibleHistoryTimeline", null);
__decorate([
    (0, common_1.Patch)('update-history-timeline'),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, history_timeline_dto_1.HistoryTimelineDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateHistoryTimeline", null);
__decorate([
    (0, common_1.Delete)("delete-history-timeline"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteHistoryTimeline", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map