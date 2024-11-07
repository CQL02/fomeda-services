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
exports.BaseSpecificationService = void 0;
const common_1 = require("@nestjs/common");
const base_specification_dto_1 = require("../../dtos/base-specification.dto");
const base_subspecification_dto_1 = require("../../dtos/base-subspecification.dto");
const category_base_specification_repository_1 = require("../../domain/repositories/category-base-specification.repository");
const category_base_subspecification_repository_1 = require("../../domain/repositories/category-base-subspecification.repository");
const sequence_services_1 = require("../../../sequence/services/implementations/sequence.services");
const sequence_constant_1 = require("../../../../common/constant/sequence.constant");
const general_specification_service_1 = require("./general-specification.service");
const category_mapper_1 = require("../mapper/category.mapper");
const object_utils_1 = require("../../../../common/utils/object.utils");
const category_exception_1 = require("../../../../common/exception/category.exception");
const string_utils_1 = require("../../../../common/utils/string.utils");
let BaseSpecificationService = class BaseSpecificationService {
    constructor(categoryBaseSpecificationRepository, categoryBaseSubspecificationRepository, categoryMapper, sequenceService, generalSpecificationService) {
        this.categoryBaseSpecificationRepository = categoryBaseSpecificationRepository;
        this.categoryBaseSubspecificationRepository = categoryBaseSubspecificationRepository;
        this.categoryMapper = categoryMapper;
        this.sequenceService = sequenceService;
        this.generalSpecificationService = generalSpecificationService;
    }
    async createBaseSpecification(req, baseSpecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(baseSpecificationDto) || string_utils_1.StringUtils.isEmpty(baseSpecificationDto.subcat_spec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_BASE_SPECIFICATION_PREFIX);
        const user_id = req.user;
        const result = await this.categoryBaseSpecificationRepository.create({
            ...baseSpecificationDto, _id, created_by: user_id, last_updated_by: user_id
        });
        return this.categoryMapper.mapSchemaToModel(result, base_specification_dto_1.BaseSpecificationDto);
    }
    async findBaseSpecificationByCatId(id) {
        const generalSpecList = this.categoryMapper.mapGeneralSpecificationDtoListToBaseSpecificationDtoList(await this.generalSpecificationService.findAllGeneralSpecification());
        const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilterWithUsername({ cat_id: id });
        const specificationIdList = specificationList.map(spec => spec._id);
        const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilterWithUsername({ subcat_spec_id: { $in: specificationIdList } });
        const result = specificationList.map(spec => {
            const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return filteredSubspec.length > 0 ? { ...spec, children: filteredSubspec } : spec;
        });
        return [...generalSpecList, ...result];
    }
    async findActiveBaseSpecificationByCatId(id) {
        const generalSpecList = this.categoryMapper.mapGeneralSpecificationDtoListToBaseSpecificationDtoList(await this.generalSpecificationService.findAllActiveGeneralSpecification());
        const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilter({ cat_id: id, is_active: true });
        const specificationIdList = specificationList.map(spec => spec._id);
        const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList }, is_active: true });
        const result = specificationList.map(spec => {
            const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
        });
        return [...generalSpecList, ...result];
    }
    async findActiveBaseSpecificationByCatIds(ids) {
        const filter = { is_active: true };
        if (ids && ids.length > 0) {
            filter.cat_id = { $in: ids };
        }
        const specificationList = await this.categoryBaseSpecificationRepository.findAllByFilter(filter);
        const specificationIdList = specificationList.map(spec => spec._id);
        const subspecificationList = await this.categoryBaseSubspecificationRepository.findAllByFilter({ subcat_spec_id: { $in: specificationIdList }, is_active: true });
        const result = specificationList.map(spec => {
            const filteredSubspec = subspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return (filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject());
        });
        return this.categoryMapper.mapSchemaToModel(result, base_specification_dto_1.BaseSpecificationDto);
    }
    async findBaseSpecificationById(id) {
        const result = await this.categoryBaseSpecificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), base_specification_dto_1.BaseSpecificationDto);
    }
    async updateBaseSpecification(req, id, baseSpecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(baseSpecificationDto) || string_utils_1.StringUtils.isEmpty(baseSpecificationDto.subcat_spec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const user_id = String(req.user);
        baseSpecificationDto = { ...baseSpecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.categoryBaseSpecificationRepository.update(id, baseSpecificationDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, base_specification_dto_1.BaseSpecificationDto);
    }
    async deactivateBaseSpecification(req, id, is_active) {
        const result = await this.categoryBaseSpecificationRepository.deactivateCategoryBaseSpecificationById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, base_specification_dto_1.BaseSpecificationDto);
    }
    async deleteBaseSpecification(id) {
        await this.categoryBaseSubspecificationRepository.deleteCategoryBaseSubspecificationBySpecId(id);
        const result = await this.categoryBaseSpecificationRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, base_specification_dto_1.BaseSpecificationDto);
    }
    async createBaseSubspecification(req, baseSubspecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(baseSubspecificationDto) || string_utils_1.StringUtils.isEmpty(baseSubspecificationDto.subcat_subspec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_BASE_SUBSPECIFICATION_PREFIX);
        const user_id = req.user;
        const result = await this.categoryBaseSubspecificationRepository.create({ ...baseSubspecificationDto, _id, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, base_subspecification_dto_1.BaseSubspecificationDto);
    }
    async findBaseSubspecificationById(id) {
        const result = await this.categoryBaseSubspecificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), base_subspecification_dto_1.BaseSubspecificationDto);
    }
    async updateBaseSubspecification(req, id, baseSubspecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(baseSubspecificationDto) || string_utils_1.StringUtils.isEmpty(baseSubspecificationDto.subcat_subspec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const user_id = String(req.user);
        baseSubspecificationDto = { ...baseSubspecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.categoryBaseSubspecificationRepository.update(id, baseSubspecificationDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, base_subspecification_dto_1.BaseSubspecificationDto);
    }
    async deactivateBaseSubspecification(req, id, is_active) {
        const result = await this.categoryBaseSubspecificationRepository.deactivateCategoryBaseSubspecificationById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, base_subspecification_dto_1.BaseSubspecificationDto);
    }
    async deleteBaseSubspecification(id) {
        const result = await this.categoryBaseSubspecificationRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, base_subspecification_dto_1.BaseSubspecificationDto);
    }
};
exports.BaseSpecificationService = BaseSpecificationService;
exports.BaseSpecificationService = BaseSpecificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(sequence_services_1.SequenceService.name)),
    __param(4, (0, common_1.Inject)(general_specification_service_1.GeneralSpecificationService.name)),
    __metadata("design:paramtypes", [category_base_specification_repository_1.CategoryBaseSpecificationRepository,
        category_base_subspecification_repository_1.CategoryBaseSubspecificationRepository,
        category_mapper_1.CategoryMapper, Object, Object])
], BaseSpecificationService);
//# sourceMappingURL=base-specification.service.js.map