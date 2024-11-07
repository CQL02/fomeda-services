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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_dto_1 = require("../dtos/role.dto");
const role_service_1 = require("../services/implementations/role.service");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async getAllRoles() {
        return this.roleService.findAllRoles();
    }
    async findAllActiveRoles() {
        return this.roleService.findAllActiveRoles();
    }
    async createRole(roleDto) {
        return this.roleService.createRole(roleDto);
    }
    async updateRole(id, roleDto) {
        return this.roleService.updateRole(id, roleDto);
    }
    async getModules(id) {
        return this.roleService.getModules(id);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)("get-roles"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Get)("get-active-roles"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAllActiveRoles", null);
__decorate([
    (0, common_1.Post)('create-role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.Patch)('update-role'),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Get)("get-modules"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getModules", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __param(0, (0, common_1.Inject)(role_service_1.RoleService.name)),
    __metadata("design:paramtypes", [Object])
], RoleController);
//# sourceMappingURL=role.controller.js.map