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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_repository_1 = require("../../domain/repositories/role.repository");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(roleDto) {
        return this.roleRepository.create(roleDto);
    }
    async findAllRoles() {
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
        return await this.roleRepository.aggregate(pipeline);
    }
    async findAllActiveRoles() {
        const pipeline = [
            { $match: { is_active: true } },
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
        return this.roleRepository.aggregate(pipeline);
    }
    async updateRole(id, roleDto) {
        return this.roleRepository.update(id, { ...roleDto, last_updated_on: new Date() });
    }
    async getModules(id) {
        return this.roleRepository.findOneByFilter({ _id: id }, { _id: 0 });
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleService);
//# sourceMappingURL=role.service.js.map