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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_dto_1 = require("../dtos/category.dto");
const category_service_1 = require("../services/implementations/category.service");
const general_specification_dto_1 = require("../dtos/general-specification.dto");
const general_specification_service_1 = require("../services/implementations/general-specification.service");
const general_subspecification_dto_1 = require("../dtos/general-subspecification.dto");
const subcategory_dto_1 = require("../dtos/subcategory.dto");
const base_specification_dto_1 = require("../dtos/base-specification.dto");
const base_specification_service_1 = require("../services/implementations/base-specification.service");
const subcategory_specification_service_1 = require("../services/implementations/subcategory-specification.service");
const base_subspecification_dto_1 = require("../dtos/base-subspecification.dto");
const subcategory_specification_dto_1 = require("../dtos/subcategory-specification.dto");
const subcategory_subspecification_dto_1 = require("../dtos/subcategory-subspecification.dto");
const authentication_guard_1 = require("../../authentication/passport/authentication.guard");
let CategoryController = class CategoryController {
    constructor(categoryService, generalSpecificationService, baseSpecificationService, subcategorySpecificationService) {
        this.categoryService = categoryService;
        this.generalSpecificationService = generalSpecificationService;
        this.baseSpecificationService = baseSpecificationService;
        this.subcategorySpecificationService = subcategorySpecificationService;
    }
    async createCategory(req, categoryDto) {
        return await this.categoryService.createCategory(req, categoryDto);
    }
    async updateCategory(req, id, categoryDto) {
        return await this.categoryService.updateCategory(req, id, categoryDto);
    }
    async findAllCategories() {
        return await this.categoryService.findAllCategories();
    }
    async findAllActiveCategories() {
        return await this.categoryService.findAllActiveCategories();
    }
    async findCategoryById(id) {
        return await this.categoryService.findCategoryById(id);
    }
    async createSubcategory(req, subcategoryDto) {
        return await this.categoryService.createSubcategory(req, subcategoryDto);
    }
    async findOneSubcategoryById(id) {
        return await this.categoryService.findOneSubcategoryById(id);
    }
    async updateSubcategory(req, id, subcategoryDto) {
        return await this.categoryService.updateSubcategory(req, id, subcategoryDto);
    }
    async deactivateCategory(req, id, is_active) {
        return await this.categoryService.deactivateCategory(req, id, is_active);
    }
    async deactivateSubcategory(req, id, is_active) {
        return await this.categoryService.deactivateSubcategory(req, id, is_active);
    }
    async deleteCategory(id) {
        return await this.categoryService.deleteCategory(id);
    }
    async deleteSubcategory(id) {
        return await this.categoryService.deleteSubcategory(id);
    }
    async findNameById(id) {
        return await this.categoryService.findNameById(id);
    }
    async createGeneralSpecification(req, generalSpecificationDto) {
        return await this.generalSpecificationService.createGeneralSpecification(req, generalSpecificationDto);
    }
    async findAllGeneralSpecification() {
        return await this.generalSpecificationService.findAllGeneralSpecification();
    }
    async findGeneralSpecificationById(id) {
        return await this.generalSpecificationService.findGeneralSpecificationById(id);
    }
    async updateGeneralSpecification(req, id, generalSpecificationDto) {
        return await this.generalSpecificationService.updateGeneralSpecification(req, id, generalSpecificationDto);
    }
    async deactivateGeneralSpecification(req, id, is_active) {
        return await this.generalSpecificationService.deactivateGeneralSpecification(req, id, is_active);
    }
    async deleteGeneralSpecification(id) {
        return await this.generalSpecificationService.deleteGeneralSpecification(id);
    }
    async createGeneralSubspecification(req, generalSubspecificationDto) {
        return await this.generalSpecificationService.createGeneralSubspecification(req, generalSubspecificationDto);
    }
    async findGeneralSubspecificationById(id) {
        return await this.generalSpecificationService.findGeneralSubspecificationById(id);
    }
    async findAllGeneralSubspecification() {
        return await this.generalSpecificationService.findAllGeneralSubspecification();
    }
    async updateGeneralSubspecification(req, id, generalSubspecificationDto) {
        return await this.generalSpecificationService.updateGeneralSubspecification(req, id, generalSubspecificationDto);
    }
    async deactivateGeneralSubspecification(req, id, is_active) {
        return await this.generalSpecificationService.deactivateGeneralSubspecification(req, id, is_active);
    }
    async deleteGeneralSubspecification(id) {
        return await this.generalSpecificationService.deleteGeneralSubspecification(id);
    }
    async createBaseSpecification(req, baseSpecificationDto) {
        return await this.baseSpecificationService.createBaseSpecification(req, baseSpecificationDto);
    }
    async findBaseSpecificationByCatId(id) {
        return await this.baseSpecificationService.findBaseSpecificationByCatId(id);
    }
    async findBaseSpecificationById(id) {
        return await this.baseSpecificationService.findBaseSpecificationById(id);
    }
    async updateBaseSpecification(req, id, baseSpecificationDto) {
        return await this.baseSpecificationService.updateBaseSpecification(req, id, baseSpecificationDto);
    }
    async deactivateBaseSpecification(req, id, is_active) {
        return await this.baseSpecificationService.deactivateBaseSpecification(req, id, is_active);
    }
    async deleteBaseSpecification(id) {
        return await this.baseSpecificationService.deleteBaseSpecification(id);
    }
    async createBaseSubspecification(req, baseSubspecificationDto) {
        return await this.baseSpecificationService.createBaseSubspecification(req, baseSubspecificationDto);
    }
    async findBaseSubspecificationById(id) {
        return await this.baseSpecificationService.findBaseSubspecificationById(id);
    }
    async updateBaseSubspecification(req, id, baseSubspecificationDto) {
        return await this.baseSpecificationService.updateBaseSubspecification(req, id, baseSubspecificationDto);
    }
    async deactivateBaseSubspecification(req, id, is_active) {
        return await this.baseSpecificationService.deactivateBaseSubspecification(req, id, is_active);
    }
    async deleteBaseSubspecification(id) {
        return await this.baseSpecificationService.deleteBaseSubspecification(id);
    }
    async createSubcategorySpecification(req, subcategorySpecificationDto) {
        return await this.subcategorySpecificationService.createSubcategorySpecification(req, subcategorySpecificationDto);
    }
    async findSubcategorySpecificationByCatId(id) {
        return await this.subcategorySpecificationService.findSubcategorySpecificationByCatId(id);
    }
    async findActiveSubcategorySpecificationByCatId(id) {
        return await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(id);
    }
    async findSubcategorySpecificationById(id) {
        return await this.subcategorySpecificationService.findSubcategorySpecificationById(id);
    }
    async updateSubcategorySpecification(req, id, subcategorySpecificationDto) {
        return await this.subcategorySpecificationService.updateSubcategorySpecification(req, id, subcategorySpecificationDto);
    }
    async deactivateSubcategorySpecification(req, id, is_active) {
        return await this.subcategorySpecificationService.deactivateSubcategorySpecification(req, id, is_active);
    }
    async deleteSubcategorySpecification(id) {
        return await this.subcategorySpecificationService.deleteSubcategorySpecification(id);
    }
    async createSubcategorySubspecification(req, subcategorySubspecificationDto) {
        return await this.subcategorySpecificationService.createSubcategorySubspecification(req, subcategorySubspecificationDto);
    }
    async findSubcategorySubspecificationById(id) {
        return await this.subcategorySpecificationService.findSubcategorySubspecificationById(id);
    }
    async getProductSpecificationBySubcatId(id) {
        return await this.subcategorySpecificationService.getProductSpecificationBySubcatId(id);
    }
    async updateSubcategorySubspecification(req, id, subcategorySubspecificationDto) {
        return await this.subcategorySpecificationService.updateSubcategorySubspecification(req, id, subcategorySubspecificationDto);
    }
    async deactivateSubcategorySubspecification(req, id, is_active) {
        return await this.subcategorySpecificationService.deactivateSubcategorySubspecification(req, id, is_active);
    }
    async deleteSubcategorySubspecification(id) {
        return await this.subcategorySpecificationService.deleteSubcategorySubspecification(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-category"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-category"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, category_dto_1.CategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Get)("find-all-category"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)("find-all-active-categories"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllActiveCategories", null);
__decorate([
    (0, common_1.Get)("get-category"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findCategoryById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-subcategory"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subcategory_dto_1.SubcategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createSubcategory", null);
__decorate([
    (0, common_1.Get)("find-one-subcategory-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOneSubcategoryById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-subcategory"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, subcategory_dto_1.SubcategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateSubcategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-category"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateCategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-subcategory"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateSubcategory", null);
__decorate([
    (0, common_1.Delete)("delete-category"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Delete)("delete-subcategory"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteSubcategory", null);
__decorate([
    (0, common_1.Get)("find-name-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findNameById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-general-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, general_specification_dto_1.GeneralSpecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createGeneralSpecification", null);
__decorate([
    (0, common_1.Get)("find-all-general-specification"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllGeneralSpecification", null);
__decorate([
    (0, common_1.Get)("find-general-specification-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findGeneralSpecificationById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-general-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, general_specification_dto_1.GeneralSpecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateGeneralSpecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-general-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateGeneralSpecification", null);
__decorate([
    (0, common_1.Delete)("delete-general-specification"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteGeneralSpecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-general-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, general_subspecification_dto_1.GeneralSubspecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createGeneralSubspecification", null);
__decorate([
    (0, common_1.Get)("find-general-subspecification-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findGeneralSubspecificationById", null);
__decorate([
    (0, common_1.Get)("find-all-general-subspecification"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllGeneralSubspecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-general-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, general_subspecification_dto_1.GeneralSubspecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateGeneralSubspecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-general-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateGeneralSubspecification", null);
__decorate([
    (0, common_1.Delete)("delete-general-subspecification"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteGeneralSubspecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-base-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, base_specification_dto_1.BaseSpecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createBaseSpecification", null);
__decorate([
    (0, common_1.Get)("find-base-specification-by-cat-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findBaseSpecificationByCatId", null);
__decorate([
    (0, common_1.Get)("find-base-specification-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findBaseSpecificationById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-base-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, base_specification_dto_1.BaseSpecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateBaseSpecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-base-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateBaseSpecification", null);
__decorate([
    (0, common_1.Delete)("delete-base-specification"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteBaseSpecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-base-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, base_subspecification_dto_1.BaseSubspecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createBaseSubspecification", null);
__decorate([
    (0, common_1.Get)("find-base-subspecification-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findBaseSubspecificationById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-base-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, base_subspecification_dto_1.BaseSubspecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateBaseSubspecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-base-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateBaseSubspecification", null);
__decorate([
    (0, common_1.Delete)("delete-base-subspecification"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteBaseSubspecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-subcategory-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subcategory_specification_dto_1.SubcategorySpecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createSubcategorySpecification", null);
__decorate([
    (0, common_1.Get)("find-subcategory-specification-by-cat-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findSubcategorySpecificationByCatId", null);
__decorate([
    (0, common_1.Get)("find-active-subcategory-specification-by-cat-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findActiveSubcategorySpecificationByCatId", null);
__decorate([
    (0, common_1.Get)("find-subcategory-specification-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findSubcategorySpecificationById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-subcategory-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, subcategory_specification_dto_1.SubcategorySpecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateSubcategorySpecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-subcategory-specification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateSubcategorySpecification", null);
__decorate([
    (0, common_1.Delete)("delete-subcategory-specification"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteSubcategorySpecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-subcategory-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subcategory_subspecification_dto_1.SubcategorySubspecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createSubcategorySubspecification", null);
__decorate([
    (0, common_1.Get)("find-subcategory-subspecification-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findSubcategorySubspecificationById", null);
__decorate([
    (0, common_1.Get)("get-product-specification-by-subcat-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getProductSpecificationBySubcatId", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-subcategory-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, subcategory_subspecification_dto_1.SubcategorySubspecificationDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateSubcategorySubspecification", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("deactivate-subcategory-subspecification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Query)("is_active")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deactivateSubcategorySubspecification", null);
__decorate([
    (0, common_1.Delete)("delete-subcategory-subspecification"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteSubcategorySubspecification", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)("category"),
    __param(0, (0, common_1.Inject)(category_service_1.CategoryService.name)),
    __param(1, (0, common_1.Inject)(general_specification_service_1.GeneralSpecificationService.name)),
    __param(2, (0, common_1.Inject)(base_specification_service_1.BaseSpecificationService.name)),
    __param(3, (0, common_1.Inject)(subcategory_specification_service_1.SubcategorySpecificationService.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CategoryController);
//# sourceMappingURL=category.controller.js.map