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
exports.AnnouncementService = void 0;
const common_1 = require("@nestjs/common");
const announcement_repository_1 = require("../../domain/repositories/announcement.repository");
let AnnouncementService = class AnnouncementService {
    constructor(announcementRepository) {
        this.announcementRepository = announcementRepository;
    }
    async createAnnouncement(announcementDto) {
        return this.announcementRepository.create({ ...announcementDto });
    }
    async editAnnouncement(id, announcementDto) {
        return this.announcementRepository.update(id, { ...announcementDto, updated_on: new Date() });
    }
    async findAllAnnouncements() {
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
                    localField: 'updated_by',
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
                    updated_by: { $ifNull: ['$updater.username', '$updated_by'] },
                },
            },
            { $unset: ['creator', 'updater'] }
        ];
        return await this.announcementRepository.aggregate(pipeline);
    }
    async findVisibleAnnouncement(filterDto) {
        return this.announcementRepository.findAllByFilter(filterDto, { title: 1, description: 1, file_uploaded: 1, created_on: 1 });
    }
};
exports.AnnouncementService = AnnouncementService;
exports.AnnouncementService = AnnouncementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [announcement_repository_1.AnnouncementRepository])
], AnnouncementService);
//# sourceMappingURL=announcement.service.js.map