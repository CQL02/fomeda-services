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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_dto_1 = require("../../dtos/category.dto");
const category_repository_1 = require("../../domain/repositories/category.repository");
const sequence_services_1 = require("../../../sequence/services/implementations/sequence.services");
const sequence_constant_1 = require("../../../../common/constant/sequence.constant");
const subcategory_dto_1 = require("../../dtos/subcategory.dto");
const subcategory_repository_1 = require("../../domain/repositories/subcategory.repository");
const category_name_dto_1 = require("../../dtos/category-name.dto");
const category_mapper_1 = require("../mapper/category.mapper");
const category_exception_1 = require("../../../../common/exception/category.exception");
const object_utils_1 = require("../../../../common/utils/object.utils");
const string_utils_1 = require("../../../../common/utils/string.utils");
const authentication_service_1 = require("../../../authentication/services/implementations/authentication.service");
let CategoryService = class CategoryService {
    constructor(categoryRepository, subcategoryRepository, categoryMapper, sequenceService, authenticationService) {
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.categoryMapper = categoryMapper;
        this.sequenceService = sequenceService;
        this.authenticationService = authenticationService;
    }
    async createCategory(req, categoryDto) {
        if (object_utils_1.ObjectUtils.isEmpty(categoryDto) || string_utils_1.StringUtils.isEmpty(categoryDto.cat_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.EMPTY_CATEGORY);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_CATEGORY_PREFIX);
        const user_id = req.user;
        const result = await this.categoryRepository.create({ ...categoryDto, _id, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, category_dto_1.CategoryDto);
    }
    async findAllCategories() {
        const categoryList = await this.categoryRepository.getAllCategoryWithUsername();
        const subcategoryList = await this.subcategoryRepository.getAllSubcategoryWithUsername();
        return categoryList.map(cat => {
            const filteredSubcategory = subcategoryList.filter(subcat => subcat.cat_id === cat._id.toString());
            return filteredSubcategory.length > 0 ? { ...cat, children: filteredSubcategory } : cat;
        });
    }
    async findAllActiveCategories() {
        const categories = await this.findAllCategories();
        const result = categories.filter(cat => cat.is_active)
            .map(cat => ({
            _id: cat._id,
            cat_name: cat.cat_name,
            children: cat.children?.filter(subcat => subcat.is_active).map(subcat => ({
                _id: subcat._id,
                subcat_name: subcat.subcat_name,
            }))
        }));
        return this.categoryMapper.mapSchemaListToDtoList(result, category_dto_1.CategoryDto);
    }
    async findCategoryById(id) {
        const result = await this.categoryRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.CATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, category_dto_1.CategoryDto);
    }
    async updateCategory(req, id, categoryDto) {
        if (object_utils_1.ObjectUtils.isEmpty(categoryDto) || string_utils_1.StringUtils.isEmpty(categoryDto.cat_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_CATEGORY);
        }
        const user_id = String(req.user);
        categoryDto = { ...categoryDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.categoryRepository.update(id, categoryDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.CATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, category_dto_1.CategoryDto);
    }
    async deactivateCategory(req, id, is_active) {
        const result = await this.categoryRepository.deactivateCategoryById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.CATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, category_dto_1.CategoryDto);
    }
    async deleteCategory(id) {
        await this.subcategoryRepository.deleteSubcategoryByCatId(id);
        const result = await this.categoryRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.CATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, category_dto_1.CategoryDto);
    }
    async createSubcategory(req, subcategoryDto) {
        if (object_utils_1.ObjectUtils.isEmpty(subcategoryDto) || string_utils_1.StringUtils.isEmpty(subcategoryDto.subcat_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SUBCATEGORY);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_SUBCATEGORY_PREFIX);
        const rating_score = Array.from({ length: 5 }, (_, index) => ({
            rating: index + 1,
            min_value: 0,
            max_value: 0,
        }));
        const user_id = String(req.user);
        const result = await this.subcategoryRepository.create({ ...subcategoryDto, _id, rating_score, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, subcategory_dto_1.SubcategoryDto);
    }
    async updateSubcategory(req, id, subcategoryDto) {
        if (object_utils_1.ObjectUtils.isEmpty(subcategoryDto)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_CATEGORY);
        }
        const user_id = String(req.user);
        subcategoryDto = { ...subcategoryDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.subcategoryRepository.update(id, subcategoryDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_dto_1.SubcategoryDto);
    }
    async deactivateSubcategory(req, id, is_active) {
        const result = await this.subcategoryRepository.deactivateSubcategoryById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_dto_1.SubcategoryDto);
    }
    async deleteSubcategory(id) {
        const result = await this.subcategoryRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_dto_1.SubcategoryDto);
    }
    async findAllSubcategory() {
        const result = await this.subcategoryRepository.findAll();
        return this.categoryMapper.mapSchemaListToDtoList(result, subcategory_dto_1.SubcategoryDto);
    }
    async findAllSubcategoryByCatId(cat_id) {
        const result = await this.subcategoryRepository.findSubcategoryByCatId(cat_id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaListToDtoList(result, subcategory_dto_1.SubcategoryDto);
    }
    async findOneSubcategoryById(id) {
        const result = await this.subcategoryRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SUBCATEGORY_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), subcategory_dto_1.SubcategoryDto);
    }
    async findNameById(id) {
        if (id.includes(sequence_constant_1.SequenceConstant.PRODUCT_SUBCATEGORY_PREFIX)) {
            const subcat = await this.subcategoryRepository.findOneById(id);
            const cat = await this.categoryRepository.findOneById(subcat.cat_id);
            return { cat_name: cat.cat_name, subcat_name: subcat.subcat_name };
        }
        else {
            const cat = await this.categoryRepository.findOneById(id);
            return { cat_name: cat.cat_name, subcat_name: null };
        }
    }
    async findAllSubcategoryNameByIds(ids) {
        let subcategories = [];
        let categories = [];
        if (ids.length === 0) {
            subcategories = await this.subcategoryRepository.findAll();
            categories = await this.categoryRepository.findAll();
        }
        else {
            subcategories = await this.subcategoryRepository.findAllByFilter({ _id: { $in: ids } });
            const categoryIds = subcategories.map(subcat => subcat.cat_id);
            categories = await this.categoryRepository.findAllByFilter({ _id: { $in: categoryIds } });
        }
        const categoryMap = categories.reduce((acc, cat) => {
            acc[cat._id] = cat.cat_name;
            return acc;
        }, {});
        const combinedDtos = subcategories.map(subcat => ({
            subcat_id: subcat._id,
            subcat_name: subcat.subcat_name,
            cat_id: subcat.cat_id,
            cat_name: categoryMap[subcat.cat_id],
        }));
        const categoryDtos = categories
            .filter(cat => !subcategories.some(subcat => subcat.cat_id === cat._id))
            .map(cat => ({
            cat_id: cat._id,
            cat_name: cat.cat_name,
        }));
        return this.categoryMapper.mapSchemaListToDtoList([...combinedDtos, ...categoryDtos], category_name_dto_1.CategoryNameDto);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(sequence_services_1.SequenceService.name)),
    __param(4, (0, common_1.Inject)(authentication_service_1.AuthenticationService.name)),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        subcategory_repository_1.SubcategoryRepository,
        category_mapper_1.CategoryMapper, Object, Object])
], CategoryService);
//# sourceMappingURL=category.service.js.map