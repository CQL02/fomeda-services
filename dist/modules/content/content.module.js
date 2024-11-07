"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const carousel_schema_1 = require("./domain/schema/carousel.schema");
const content_schema_1 = require("./domain/schema/content.schema");
const history_timeline_schema_1 = require("./domain/schema/history-timeline.schema");
const carousel_repository_1 = require("./domain/repositories/carousel.repository");
const content_repository_1 = require("./domain/repositories/content.repository");
const history_timeline_repository_1 = require("./domain/repositories/history-timeline.repository");
const content_controller_1 = require("./controllers/content.controller");
const content_service_1 = require("./services/implementations/content.service");
let ContentModule = class ContentModule {
};
exports.ContentModule = ContentModule;
exports.ContentModule = ContentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: carousel_schema_1.Carousel.name, schema: carousel_schema_1.CarouselSchema },
                { name: content_schema_1.Content.name, schema: content_schema_1.ContentSchema },
                { name: history_timeline_schema_1.HistoryTimeline.name, schema: history_timeline_schema_1.HistoryTimelineSchema },
            ]),
        ],
        providers: [content_service_1.ContentService, carousel_repository_1.CarouselRepository, content_repository_1.ContentRepository, history_timeline_repository_1.HistoryTimelineRepository],
        controllers: [content_controller_1.ContentController],
    })
], ContentModule);
//# sourceMappingURL=content.module.js.map