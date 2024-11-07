"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const announcement_schema_1 = require("./domain/schema/announcement.schema");
const announcement_repository_1 = require("./domain/repositories/announcement.repository");
const announcement_controller_1 = require("./controllers/announcement.controller");
const announcement_service_1 = require("./services/implementations/announcement.service");
let AnnouncementModule = class AnnouncementModule {
};
exports.AnnouncementModule = AnnouncementModule;
exports.AnnouncementModule = AnnouncementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: announcement_schema_1.Announcement.name, schema: announcement_schema_1.AnnouncementSchema },
            ]),
        ],
        providers: [announcement_service_1.AnnouncementService, announcement_repository_1.AnnouncementRepository],
        controllers: [announcement_controller_1.AnnouncementController],
    })
], AnnouncementModule);
//# sourceMappingURL=announcement.module.js.map