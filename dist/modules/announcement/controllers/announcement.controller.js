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
exports.AnnouncementController = void 0;
const common_1 = require("@nestjs/common");
const announcement_dto_1 = require("../dtos/announcement.dto");
const announcement_service_1 = require("../services/implementations/announcement.service");
let AnnouncementController = class AnnouncementController {
    constructor(announcementService) {
        this.announcementService = announcementService;
    }
    async getAllAnnouncement() {
        return this.announcementService.findAllAnnouncements();
    }
    async getVisibleAnnouncement() {
        return this.announcementService.findVisibleAnnouncement({ visibility: true });
    }
    async createAnnouncement(announcementDto) {
        return this.announcementService.createAnnouncement(announcementDto);
    }
    async editAnnouncement(id, announcementDto) {
        return this.announcementService.editAnnouncement(id, announcementDto);
    }
};
exports.AnnouncementController = AnnouncementController;
__decorate([
    (0, common_1.Get)('find-all-announcement'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "getAllAnnouncement", null);
__decorate([
    (0, common_1.Get)('find-visible-announcement'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "getVisibleAnnouncement", null);
__decorate([
    (0, common_1.Post)('create-announcement'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [announcement_dto_1.AnnouncementDto]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "createAnnouncement", null);
__decorate([
    (0, common_1.Patch)('edit-announcement'),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, announcement_dto_1.AnnouncementDto]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "editAnnouncement", null);
exports.AnnouncementController = AnnouncementController = __decorate([
    (0, common_1.Controller)('announcement'),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService])
], AnnouncementController);
//# sourceMappingURL=announcement.controller.js.map