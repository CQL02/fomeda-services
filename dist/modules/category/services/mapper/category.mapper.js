"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMapper = void 0;
const base_specification_dto_1 = require("../../dtos/base-specification.dto");
const subcategory_specification_dto_1 = require("../../dtos/subcategory-specification.dto");
const mapper_utils_1 = require("../../../../common/utils/mapper.utils");
const common_1 = require("@nestjs/common");
const base_subspecification_dto_1 = require("../../dtos/base-subspecification.dto");
const subcategory_subspecification_dto_1 = require("../../dtos/subcategory-subspecification.dto");
const product_form_specification_dto_1 = require("../../dtos/product-form-specification.dto");
const product_form_subspecification_dto_1 = require("../../dtos/product-form-subspecification.dto");
let CategoryMapper = class CategoryMapper {
    mapGeneralSpecificationDtoToBaseSpecificationDto(generalSpecificationDto) {
        const mapperResult = mapper_utils_1.MapperUtils.mapToDto(generalSpecificationDto, base_specification_dto_1.BaseSpecificationDto);
        if (mapperResult.children) {
            mapperResult.children.map(child => mapper_utils_1.MapperUtils.mapToDto(child, base_subspecification_dto_1.BaseSubspecificationDto));
        }
        return { ...mapperResult, is_origin: false };
    }
    mapGeneralSpecificationDtoListToBaseSpecificationDtoList(generalSpecificationDtoList) {
        return generalSpecificationDtoList.map(spec => this.mapGeneralSpecificationDtoToBaseSpecificationDto(spec));
    }
    mapBaseSpecificationDtoToSubcategorySpecificationDto(baseSpecificationDto) {
        const mapperResult = mapper_utils_1.MapperUtils.mapToDto(baseSpecificationDto, subcategory_specification_dto_1.SubcategorySpecificationDto);
        if (mapperResult.children) {
            mapperResult.children.map(child => mapper_utils_1.MapperUtils.mapToDto(child, subcategory_subspecification_dto_1.SubcategorySubspecificationDto));
        }
        return { ...mapperResult, is_origin: false };
    }
    mapBaseSpecificationDtoListToSubcategorySpecificationDtoList(baseSpecificationDtoList) {
        return baseSpecificationDtoList.map(spec => this.mapBaseSpecificationDtoToSubcategorySpecificationDto(spec));
    }
    mapSubcategorySpecificationToProducSpecificationtFormDto(source) {
        const mapperResult = mapper_utils_1.MapperUtils.mapToDto(source, product_form_specification_dto_1.ProductFormSpecificationDto);
        if (source.children) {
            mapperResult.subspecification = source.children.map(child => mapper_utils_1.MapperUtils.mapToDto(child.toObject(), product_form_subspecification_dto_1.ProductFormSubspecificationDto));
        }
        return mapperResult;
    }
    mapSubcategorySpecificationListToProductSpecificationFormDtoList(source) {
        return source.map(spec => this.mapSubcategorySpecificationToProducSpecificationtFormDto(spec));
    }
    mapSchemaToModel(source, target) {
        return mapper_utils_1.MapperUtils.mapToDto(source, target);
    }
    mapSchemaListToDtoList(source, target) {
        return source.map(item => this.mapSchemaToModel(item, target));
    }
};
exports.CategoryMapper = CategoryMapper;
exports.CategoryMapper = CategoryMapper = __decorate([
    (0, common_1.Injectable)()
], CategoryMapper);
//# sourceMappingURL=category.mapper.js.map