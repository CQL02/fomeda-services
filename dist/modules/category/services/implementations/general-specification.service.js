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
exports.GeneralSpecificationService = void 0;
const general_specification_dto_1 = require("../../dtos/general-specification.dto");
const general_subspecification_dto_1 = require("../../dtos/general-subspecification.dto");
const category_general_specification_repository_1 = require("../../domain/repositories/category-general-specification.repository");
const category_general_subspecification_repository_1 = require("../../domain/repositories/category-general-subspecification.repository");
const sequence_constant_1 = require("../../../../common/constant/sequence.constant");
const sequence_services_1 = require("../../../sequence/services/implementations/sequence.services");
const common_1 = require("@nestjs/common");
const category_mapper_1 = require("../mapper/category.mapper");
const object_utils_1 = require("../../../../common/utils/object.utils");
const category_exception_1 = require("../../../../common/exception/category.exception");
const string_utils_1 = require("../../../../common/utils/string.utils");
let GeneralSpecificationService = class GeneralSpecificationService {
    constructor(generalSubspecificationRepository, generalSpecificationRepository, categoryMapper, sequenceService) {
        this.generalSubspecificationRepository = generalSubspecificationRepository;
        this.generalSpecificationRepository = generalSpecificationRepository;
        this.categoryMapper = categoryMapper;
        this.sequenceService = sequenceService;
    }
    async createGeneralSpecification(req, generalSpecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(generalSpecificationDto) || string_utils_1.StringUtils.isEmpty(generalSpecificationDto.subcat_spec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_GENERAL_SPECIFICATION_PREFIX);
        const user_id = req.user;
        const result = await this.generalSpecificationRepository.create({ ...generalSpecificationDto, _id, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, general_specification_dto_1.GeneralSpecificationDto);
    }
    async findAllGeneralSpecification() {
        const generalSpecificationList = await this.generalSpecificationRepository.findAllWithUsername();
        const generalSubspecificationList = await this.generalSubspecificationRepository.findAllWithUsername();
        const result = generalSpecificationList.map(spec => {
            const filteredSubspec = generalSubspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return filteredSubspec.length > 0 ? { ...spec, children: filteredSubspec } : spec;
        });
        return result;
    }
    async findAllActiveGeneralSpecification() {
        const generalSpecificationList = await this.generalSpecificationRepository.findAllByFilter({ is_active: true });
        const generalSubspecificationList = await this.generalSubspecificationRepository.findAllByFilter({ is_active: true });
        const result = generalSpecificationList.map(spec => {
            const filteredSubspec = generalSubspecificationList.filter(subspec => subspec.subcat_spec_id === spec._id.toString());
            return filteredSubspec.length > 0 ? { ...spec.toObject(), children: filteredSubspec } : spec.toObject();
        });
        return result;
    }
    async findGeneralSpecificationById(id) {
        const result = await this.generalSpecificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), general_specification_dto_1.GeneralSpecificationDto);
    }
    async updateGeneralSpecification(req, id, generalSpecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(generalSpecificationDto) || string_utils_1.StringUtils.isEmpty(generalSpecificationDto.subcat_spec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const user_id = String(req.user);
        generalSpecificationDto = { ...generalSpecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.generalSpecificationRepository.update(id, generalSpecificationDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, general_specification_dto_1.GeneralSpecificationDto);
    }
    async deactivateGeneralSpecification(req, id, is_active) {
        const result = await this.generalSpecificationRepository.deactivateGeneralSpecificationById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, general_specification_dto_1.GeneralSpecificationDto);
    }
    async deleteGeneralSpecification(id) {
        await this.generalSubspecificationRepository.deleteGeneralSubspecificationBySpecId(id);
        const result = await this.generalSpecificationRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, general_specification_dto_1.GeneralSpecificationDto);
    }
    async createGeneralSubspecification(req, generalSubspecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(generalSubspecificationDto) || string_utils_1.StringUtils.isEmpty(generalSubspecificationDto.subcat_subspec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const _id = await this.sequenceService.generateId(sequence_constant_1.SequenceConstant.PRODUCT_GENERAL_SUBSPECIFICATION_PREFIX);
        const user_id = req.user;
        const result = await this.generalSubspecificationRepository.create({ ...generalSubspecificationDto, _id, created_by: user_id, last_updated_by: user_id });
        return this.categoryMapper.mapSchemaToModel(result, general_subspecification_dto_1.GeneralSubspecificationDto);
    }
    async findAllGeneralSubspecification() {
        const result = await this.generalSubspecificationRepository.findAll();
        return this.categoryMapper.mapSchemaListToDtoList(result, general_subspecification_dto_1.GeneralSubspecificationDto);
    }
    async findGeneralSubspecificationById(id) {
        const result = await this.generalSubspecificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result.toObject(), general_subspecification_dto_1.GeneralSubspecificationDto);
    }
    async updateGeneralSubspecification(req, id, generalSubspecificationDto) {
        if (object_utils_1.ObjectUtils.isEmpty(generalSubspecificationDto) || string_utils_1.StringUtils.isEmpty(generalSubspecificationDto.subcat_subspec_name)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.INVALID_SPECIFICATION);
        }
        const user_id = String(req.user);
        generalSubspecificationDto = { ...generalSubspecificationDto, last_updated_on: new Date(), last_updated_by: user_id };
        const result = await this.generalSubspecificationRepository.update(id, generalSubspecificationDto);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, general_subspecification_dto_1.GeneralSubspecificationDto);
    }
    async deactivateGeneralSubspecification(req, id, is_active) {
        const result = await this.generalSubspecificationRepository.deactivateGeneralSubspecificationById(req, id, is_active);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, general_subspecification_dto_1.GeneralSubspecificationDto);
    }
    async deleteGeneralSubspecification(id) {
        const result = await this.generalSubspecificationRepository.delete(id);
        if (object_utils_1.ObjectUtils.isEmpty(result)) {
            throw new category_exception_1.CategoryException(category_exception_1.CategoryErrorConstant.SPECIFICATION_NOT_FOUND);
        }
        return this.categoryMapper.mapSchemaToModel(result, general_subspecification_dto_1.GeneralSubspecificationDto);
    }
};
exports.GeneralSpecificationService = GeneralSpecificationService;
exports.GeneralSpecificationService = GeneralSpecificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(sequence_services_1.SequenceService.name)),
    __metadata("design:paramtypes", [category_general_subspecification_repository_1.CategoryGeneralSubspecificationRepository,
        category_general_specification_repository_1.CategoryGeneralSpecificationRepository,
        category_mapper_1.CategoryMapper, Object])
], GeneralSpecificationService);
//# sourceMappingURL=general-specification.service.js.map