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
exports.SubcategorySpecificationService = void 0;
const common_1 = require("@nestjs/common");
const subcategory_specification_dto_1 = require("../../dtos/subcategory-specification.dto");
const subcategory_subspecification_dto_1 = require("../../dtos/subcategory-subspecification.dto");
const subcategory_specification_repository_1 = require("../../domain/repositories/subcategory-specification.repository");
const sequence_services_1 = require("../../../sequence/services/implementations/sequence.services");
const subcategory_subspecification_repository_1 = require("../../domain/repositories/subcategory-subspecification.repository");
const sequence_constant_1 = require("../../../../common/constant/sequence.constant");
const base_specification_service_1 = require("./base-specification.service");
const category_mapper_1 = require("../mapper/category.mapper");
const category_service_1 = require("./category.service");
const object_utils_1 = require("../../../../common/utils/object.utils");
const category_exception_1 = require("../../../../common/exception/category.exception");
const string_utils_1 = require("../../../../common/utils/string.utils");
const general_specification_service_1 = require("./general-specification.service");
let SubcategorySpecificationService = class SubcategorySpecificationService {
    constructor(subcategorySpecificationRepository, subcategorySubspecificationRepository, categoryMapper, sequenceService, categoryService, baseSpecificationService, generalSpecificationService) {
        this.subcategorySpecificationRepository = subcategorySpecificationRepository;
        this.subcategorySubspecificationRepository = subcategorySubspecificationRepository;
        this.categoryMapper = categoryMapper;
        this.sequenceService = sequenceService;
        this.categoryService = categoryService;
        this.baseSpecificationService = baseSpecificationService;
        this.generalSpecificationService = generalSpecificationService;
    }
    async createSubcategorySpecification(req, subcategorySpecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(subcategorySpecificationDto) || string_utils_1.StringUtils.isEmpty(subcategorySpecificationDto.subcat_spec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_SPECIFICATION_PREFIX);
        const user_id = req.user;
        const result = await this.subcategorySpecificationRepository.create({ ...subcategorySpecificationDto, _id, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, subcategory_specification_dto_1.SubcategorySpecificationDto);
    }
    async findSubcategorySpecificationByCatId(id) {
        const subcategory = await this.categoryService.findOneSubcategoryById(id);
        const baseSpecList = this.categoryMapper.mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(await this.baseSpecificationService.findBaseSpecificationByCatId(subcategory.cat_id));
        const specificationList = await this.subcategorySpecificationRepository.findAllByFilterWithUsername({ subcat_id: id });
        const specificationIdList = specificationList.map(spec => spec._id);
        const subspecificationList = await this.subcategorySubspecificationRepository.findAllByFilterWithUsername({ subcat_spec_id: { $in: specificationIdList } });
        const result = specificationList.map(spec => {
            const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return filteredSubspec.length > 0 ? { ...spec, children: filteredSubspec } : spec;
        });
        return [...baseSpecList, ...result];
    }
    async findActiveSubcategorySpecificationByCatId(id) {
        const subcategory = await this.categoryService.findOneSubcategoryById(id);
        const baseSpecList = this.categoryMapper.mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(await this.baseSpecificationService.findActiveBaseSpecificationByCatId(subcategory.cat_id));
        const specificationList = await this.subcategorySpecificationRepository.findAllByFilter({ subcat_id: id, is_active: true });
        const specificationIdList = specificationList.map(spec => spec._id);
        const subspecificationList = await this.subcategorySubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList }, is_active: true });
        const result = specificationList.map(spec => {
            const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
        });
        return [...baseSpecList, ...result];
    }
    async findActiveSubcategorySpecificationByCatIdsAndSubcatIds(cat_ids, subcat_ids) {
        const generalSpecList = await this.generalSpecificationService.findAllActiveGeneralSpecification();
        const baseSpecList = await this.baseSpecificationService.findActiveBaseSpecificationByCatIds(cat_ids);
        let result = [];
        if (subcat_ids && subcat_ids.length > 0) {
            const specificationList = await this.subcategorySpecificationRepository.findAllByFilter({
                subcat_id: { $in: subcat_ids },
                is_active: true
            });
            const specificationIdList = specificationList.map(spec => spec._id);
            const subspecificationList = await this.subcategorySubspecificationRepository.findAllByFilter({
                subcat_spec_id: { $in: specificationIdList },
                is_active: true
            });
            result = specificationList.map(spec => {
                const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
                return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
            });
        }
        return [...generalSpecList, ...baseSpecList, ...result];
    }
    async findSubcategorySpecificationById(id) {
        const result = await this.subcategorySpecificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), subcategory_specification_dto_1.SubcategorySpecificationDto);
    }
    async getProductSpecificationBySubcatId(id) {
        const specifications = await this.findSubcategorySpecificationByCatId(id);
        specifications
            .filter(spec => spec.is_active)
            .map(spec => ({
            ...spec,
            children: spec.children?.filter(subspec => subspec.is_active) || []
        }));
        return this.categoryMapper.mapSubcategorySpecificationListToProductSpecificationFormDtoList(specifications);
    }
    async updateSubcategorySpecification(req, id, subcategorySpecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(subcategorySpecificationDto) || string_utils_1.StringUtils.isEmpty(subcategorySpecificationDto.subcat_spec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const user_id = String(req.user);
        subcategorySpecificationDto = { ...subcategorySpecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.subcategorySpecificationRepository.update(id, subcategorySpecificationDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_specification_dto_1.SubcategorySpecificationDto);
    }
    async deactivateSubcategorySpecification(req, id, is_active) {
        const result = await this.subcategorySpecificationRepository.deactivateSubcategorySpecificationById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_specification_dto_1.SubcategorySpecificationDto);
    }
    async deleteSubcategorySpecification(id) {
        await this.subcategorySubspecificationRepository.deleteSubcategorySubspecificationBySpecId(id);
        const result = await this.subcategorySpecificationRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_specification_dto_1.SubcategorySpecificationDto);
    }
    async createSubcategorySubspecification(req, subcategorySubspecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(subcategorySubspecificationDto) || string_utils_1.StringUtils.isEmpty(subcategorySubspecificationDto.subcat_subspec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_SUBSPECIFICATION_PREFIX);
        const user_id = req.user;
        const result = await this.subcategorySubspecificationRepository.create({ ...subcategorySubspecificationDto, _id, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, subcategory_subspecification_dto_1.SubcategorySubspecificationDto);
    }
    async findSubcategorySubspecificationById(id) {
        const result = await this.subcategorySubspecificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), subcategory_subspecification_dto_1.SubcategorySubspecificationDto);
    }
    async updateSubcategorySubspecification(req, id, subcategorySubspecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(subcategorySubspecificationDto) || string_utils_1.StringUtils.isEmpty(subcategorySubspecificationDto.subcat_subspec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const user_id = String(req.user);
        subcategorySubspecificationDto = { ...subcategorySubspecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.subcategorySubspecificationRepository.update(id, subcategorySubspecificationDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_subspecification_dto_1.SubcategorySubspecificationDto);
    }
    async deactivateSubcategorySubspecification(req, id, is_active) {
        const result = await this.subcategorySubspecificationRepository.deactivateSubcategorySubspecificationById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_subspecification_dto_1.SubcategorySubspecificationDto);
    }
    async deleteSubcategorySubspecification(id) {
        const result = await this.subcategorySubspecificationRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, subcategory_subspecification_dto_1.SubcategorySubspecificationDto);
    }
};
exports.SubcategorySpecificationService = SubcategorySpecificationService;
exports.SubcategorySpecificationService = SubcategorySpecificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(sequence_services_1.SequenceService.name)),
    __param(4, (0, common_1.Inject)(category_service_1.CategoryService.name)),
    __param(5, (0, common_1.Inject)(base_specification_service_1.BaseSpecificationService.name)),
    __param(6, (0, common_1.Inject)(general_specification_service_1.GeneralSpecificationService.name)),
    __metadata("design:paramtypes", [subcategory_specification_repository_1.SubcategorySpecificationRepository,
        subcategory_subspecification_repository_1.SubcategorySubspecificationRepository,
        category_mapper_1.CategoryMapper, Object, Object, Object, Object])
], SubcategorySpecificationService);
//# sourceMappingURL=subcategory-specification.service.js.map