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
exports.ConsumerService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../domain/repositories/product.repository");
const product_specification_repository_1 = require("../../domain/repositories/product-specification.repository");
const category_service_1 = require("../../../category/services/implementations/category.service");
const subcategory_specification_service_1 = require("../../../category/services/implementations/subcategory-specification.service");
const product_service_1 = require("./product.service");
const product_mapper_1 = require("../mapper/product.mapper");
const object_utils_1 = require("../../../../common/utils/object.utils");
const product_exception_1 = require("../../../../common/exception/product.exception");
let ConsumerService = class ConsumerService {
    constructor(productRepository, productSpecificationRepository, productMapper, productService, categoryService, subcategorySpecificationService) {
        this.productRepository = productRepository;
        this.productSpecificationRepository = productSpecificationRepository;
        this.productMapper = productMapper;
        this.productService = productService;
        this.categoryService = categoryService;
        this.subcategorySpecificationService = subcategorySpecificationService;
    }
    async getConsumerComparedProduct(subcat_id, ids) {
        const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(subcat_id);
        const { specMap, subspecMap } = this.getSpecMaps(specList);
        const products = Promise.all(ids.map(async (id) => {
            const result = await this.productService.getProductDetailsById(id);
            if (result.specification) {
                result.specification.map((spec) => {
                    const currentSpec = specMap.get(spec.spec_id);
                    spec.spec_name = currentSpec.name;
                    spec.spec_type = currentSpec.spec_type;
                    spec.prefix = currentSpec.prefix;
                    spec.suffix = currentSpec.suffix;
                    if (spec.subspecification) {
                        spec.subspecification.map(subspec => {
                            const currentSubspec = subspecMap.get(subspec.subspec_id);
                            subspec.subspec_name = currentSubspec.name;
                            subspec.prefix = currentSubspec.prefix;
                            subspec.suffix = currentSubspec.suffix;
                        });
                    }
                });
            }
            return result;
        }));
        return products;
    }
    async getConsumerProductByFilter(filter, skip, limit) {
        return await this.productRepository.getConsumerProductByFilter(filter, skip, limit);
    }
    async getConsumerSpecificationFilterBySubcatId(subcat_id) {
        const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(subcat_id);
        const { specMap, subspecMap } = this.getSpecMaps(specList);
        const specIds = specList.map(spec => spec._id);
        const proSpecList = await this.productSpecificationRepository.findAllByFilter({ spec_id: { $in: specIds } });
        const result = {
            specification: [],
            subspecification: []
        };
        proSpecList.forEach(currentSpec => {
            const existingSpec = result.specification.find(item => item.spec_id === currentSpec.spec_id);
            if (existingSpec) {
                if (!existingSpec.desc_list.includes(currentSpec.spec_desc)) {
                    existingSpec.desc_list.push(currentSpec.spec_desc);
                }
            }
            else {
                const specData = specMap.get(currentSpec.spec_id);
                result.specification.push({
                    spec_id: currentSpec.spec_id,
                    spec_name: specData.name,
                    spec_type: specData.spec_type,
                    field_type: specData.field_type,
                    prefix: specData.prefix,
                    suffix: specData.suffix,
                    desc_list: [currentSpec.spec_desc]
                });
            }
            currentSpec.subspecification?.forEach(subspec => {
                const exisitingSubspec = result.subspecification.find(item => item.subspec_id === subspec.subspec_id);
                if (exisitingSubspec) {
                    if (!exisitingSubspec.desc_list.includes(subspec.subspec_desc)) {
                        exisitingSubspec.desc_list.push(subspec.subspec_desc);
                    }
                }
                else {
                    const subspecData = subspecMap.get(subspec.subspec_id);
                    result.subspecification.push({
                        spec_id: currentSpec.spec_id,
                        subspec_id: subspec.subspec_id,
                        subspec_name: subspecData.name,
                        field_type: subspecData.field_type,
                        prefix: subspecData.prefix,
                        suffix: subspecData.suffix,
                        desc_list: [subspec.subspec_desc]
                    });
                }
            });
        });
        return result;
    }
    getSpecMaps(specList) {
        const specMap = new Map();
        const subspecMap = new Map();
        specList.forEach(spec => {
            specMap.set(spec._id, {
                name: spec.subcat_spec_name,
                spec_type: spec.cat_type,
                field_type: spec.field_type,
                prefix: spec.prefix,
                suffix: spec.suffix
            });
            spec.children?.forEach(child => {
                subspecMap.set(child._id, {
                    name: child.subcat_subspec_name,
                    field_type: spec.field_type,
                    prefix: child.prefix,
                    suffix: child.suffix
                });
            });
        });
        return { specMap, subspecMap };
    }
    async getProductDetails(id) {
        const product = await this.productService.getProductDetailsById(id);
        if (object_utils_1.ObjectUtils.isEmpty(product)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_NOT_FOUND);
        }
        const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(product.subcat_id);
        const { specMap, subspecMap } = this.getSpecMaps(specList);
        if (product.specification) {
            product.specification.map((spec) => {
                const specData = specMap.get(spec.spec_id);
                spec.spec_name = specData.name;
                spec.spec_type = specData.spec_type;
                spec.prefix = specData.prefix;
                spec.suffix = specData.suffix;
                if (spec.subspecification) {
                    spec.subspecification.map((subspec) => {
                        const subspecData = subspecMap.get(subspec.subspec_id);
                        subspec.subspec_name = subspecData.name;
                        subspec.prefix = subspecData.prefix;
                        subspec.suffix = subspecData.suffix;
                    });
                }
            });
        }
        return product;
    }
};
exports.ConsumerService = ConsumerService;
exports.ConsumerService = ConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(product_service_1.ProductService.name)),
    __param(4, (0, common_1.Inject)(category_service_1.CategoryService.name)),
    __param(5, (0, common_1.Inject)(subcategory_specification_service_1.SubcategorySpecificationService.name)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        product_specification_repository_1.ProductSpecificationRepository,
        product_mapper_1.ProductMapper, Object, Object, Object])
], ConsumerService);
//# sourceMappingURL=consumer.service.js.map