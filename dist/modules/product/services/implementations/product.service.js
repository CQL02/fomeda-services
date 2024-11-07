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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../../domain/repositories/product.repository");
const product_specification_repository_1 = require("../../domain/repositories/product-specification.repository");
const product_dto_1 = require("../../dtos/product.dto");
const object_utils_1 = require("../../../../common/utils/object.utils");
const product_exception_1 = require("../../../../common/exception/product.exception");
const uuid_1 = require("uuid");
const string_utils_1 = require("../../../../common/utils/string.utils");
const category_service_1 = require("../../../category/services/implementations/category.service");
const authentication_service_1 = require("../../../authentication/services/implementations/authentication.service");
const product_mapper_1 = require("../mapper/product.mapper");
const subcategory_specification_service_1 = require("../../../category/services/implementations/subcategory-specification.service");
const product_specification_dto_1 = require("../../dtos/product-specification.dto");
const category_constant_1 = require("../../../../common/constant/category.constant");
const product_constant_1 = require("../../../../common/constant/product.constant");
const product_verification_respository_1 = require("../../domain/repositories/product-verification.respository");
const product_verification_specification_repository_1 = require("../../domain/repositories/product-verification-specification.repository");
let ProductService = class ProductService {
    constructor(productRepository, productSpecificationRepository, productVerificationRepository, productVerificationSpecificationRepository, productMapper, categoryService, subcategorySpecificationService, authenticationService) {
        this.productRepository = productRepository;
        this.productSpecificationRepository = productSpecificationRepository;
        this.productVerificationRepository = productVerificationRepository;
        this.productVerificationSpecificationRepository = productVerificationSpecificationRepository;
        this.productMapper = productMapper;
        this.categoryService = categoryService;
        this.subcategorySpecificationService = subcategorySpecificationService;
        this.authenticationService = authenticationService;
    }
    async createProduct(productDto) {
        if (object_utils_1.ObjectUtils.isEmpty(productDto)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.INVALID_PRODUCT);
        }
        const productSearch = await this.productRepository.findOneById(productDto.pro_id);
        if (object_utils_1.ObjectUtils.isNotEmpty(productSearch)) {
            return await this.updateProductDetailsById(productDto.pro_id, productDto);
        }
        const product = await this.productRepository.create({ ...productDto, _id: productDto.pro_id });
        const specifications = Object.values(productDto.specification).map(spec => ({
            ...spec,
            pro_id: productDto.pro_id
        }));
        const pro_spec = await this.productSpecificationRepository.createList(specifications);
        return object_utils_1.ObjectUtils.isNotEmpty(product) || object_utils_1.ObjectUtils.isNotEmpty(pro_spec);
    }
    async getProductDetailsById(id) {
        if (string_utils_1.StringUtils.isEmpty(id)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
        }
        const product = await this.productRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(product)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_NOT_FOUND);
        }
        const { subcat_name, cat_name } = await this.categoryService.findNameById(product.subcat_id);
        const owner_username = await this.authenticationService
            .findUserById(product.owner_id)
            .then(user => user.username);
        const proSpec = await this.productSpecificationRepository.findAllByFilter({ pro_id: id });
        const proSpecDto = this.productMapper.mapSchemaListToDtoList(proSpec.map(spec => spec.toObject()), product_specification_dto_1.ProductSpecificationDto);
        const productObject = product.toObject();
        return {
            ...productObject,
            specification: proSpecDto,
            subcat_name,
            owner_username,
            cat_name
        };
    }
    async getProductListByFilter(req, productListFilterDto) {
        productListFilterDto.owner_id = String(req.user);
        const productList = await this.productRepository.getProductByFilter(productListFilterDto);
        if (object_utils_1.ObjectUtils.isEmpty(productList)) {
            return [];
        }
        const subcatIdToNameMap = await this.getCategoryAndSubcategoryMapByCatIds(productListFilterDto.cat_ids ?? []);
        const result = productList.map(product => {
            const subcatData = subcatIdToNameMap.get(product.subcat_id);
            return {
                ...product.toObject(),
                subcat_name: subcatData?.subcat_name || null,
                cat_name: subcatData?.cat_name || null
            };
        });
        return this.productMapper.mapSchemaListToDtoList(result, product_dto_1.ProductDto);
    }
    async updateProductDetailsById(id, productDto) {
        const updateProduct = await this.productRepository.update(id, { ...productDto, _id: productDto.pro_id });
        const updateProductSpec = await this.productSpecificationRepository.updateProductSpecifications(id, productDto.specification);
        return object_utils_1.ObjectUtils.isNotEmpty(updateProduct) && object_utils_1.ObjectUtils.isNotEmpty(updateProductSpec);
    }
    async updateProductIsActive(id) {
        const product = await this.productRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(product)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_NOT_FOUND);
        }
        const updateProduct = await this.productRepository.updateOneByFilter({ _id: id }, { is_active: !product.is_active });
        if (object_utils_1.ObjectUtils.isEmpty(updateProduct)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.FAILED_TO_ACTIVATE);
        }
        return true;
    }
    async deleteProductById(id) {
        const specResult = await this.productSpecificationRepository.deleteProductSpecificationByProId(id);
        const productResult = await this.productRepository.delete(id);
        return object_utils_1.ObjectUtils.isNotEmpty(productResult) && object_utils_1.ObjectUtils.isNotEmpty(specResult);
    }
    async createProductVerification(req, productDto) {
        if (object_utils_1.ObjectUtils.isEmpty(productDto)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
        }
        const verificationId = productDto.verification_id ?? null;
        const pro_id = productDto.pro_id ?? (0, uuid_1.v4)();
        const _id = (0, uuid_1.v4)();
        const searchVerification = await this.productVerificationRepository.findOneById(verificationId);
        if (object_utils_1.ObjectUtils.isNotEmpty(searchVerification) && searchVerification.status === product_constant_1.ProductConstant.PENDING) {
            return await this.updateProductVerificationDetailsById(req, verificationId, productDto);
        }
        if (object_utils_1.ObjectUtils.isNotEmpty(searchVerification) && !productDto.specification) {
            const proDetails = await this.getProductVerificationDetailsById(productDto.verification_id);
            proDetails.status = product_constant_1.ProductConstant.PENDING;
            proDetails.reviewed_by = null;
            proDetails.reviewed_on = null;
            productDto.rejected_reason = null;
            productDto.rating = 0;
            productDto.total_score = 0;
            const resubmitApplication = await this.productVerificationRepository.create({ ...proDetails, _id });
            const specifications = this.mapSpecificationsWithVerificationId(proDetails.specification, _id);
            const resubmitSpecification = await this.productVerificationSpecificationRepository.createList(specifications);
            return object_utils_1.ObjectUtils.isNotEmpty(resubmitSpecification) || object_utils_1.ObjectUtils.isNotEmpty(resubmitApplication);
        }
        const owner_id = String(req.user);
        const productVerification = await this.productVerificationRepository.create({
            ...productDto,
            _id,
            pro_id,
            owner_id
        });
        const specifications = this.mapSpecificationsWithVerificationId(productDto.specification, _id);
        const proSpec = await this.productVerificationSpecificationRepository.createList(specifications);
        return object_utils_1.ObjectUtils.isNotEmpty(productVerification) || object_utils_1.ObjectUtils.isNotEmpty(proSpec);
    }
    mapSpecificationsWithVerificationId(specification, verificationId) {
        return Object.values(specification).map((spec) => ({
            ...spec,
            verification_id: verificationId
        }));
    }
    async getProductVerificationDetailsById(id) {
        if (string_utils_1.StringUtils.isEmpty(id)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
        }
        const productVerification = await this.productVerificationRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(productVerification)) {
            throw new product_exception_1.ProductException(product_exception_1.ProductErrorConstant.PRODUCT_NOT_FOUND);
        }
        const { subcat_name, cat_name } = await this.categoryService.findNameById(productVerification.subcat_id);
        const owner_username = await this.authenticationService
            .findUserById(productVerification.owner_id)
            .then(user => user.username);
        const subcategory = await this.categoryService.findOneSubcategoryById(productVerification.subcat_id);
        const rating_score = subcategory.rating_score ?? [];
        const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(productVerification.subcat_id);
        const specification = await this.populateSpecDetails(id, specList, productVerification.status);
        const productVerificationObject = productVerification.toObject();
        return {
            ...productVerificationObject,
            cat_name,
            subcat_name,
            owner_username,
            specification,
            rating_score
        };
    }
    async populateSpecDetails(id, specList, status) {
        const proSpec = await this.productVerificationSpecificationRepository.findAllByFilter({ verification_id: id });
        const proSpecDto = this.productMapper.mapSchemaListToDtoList(proSpec.map(spec => spec.toObject()), product_specification_dto_1.ProductSpecificationDto);
        const finalSpecDetails = [];
        specList.forEach(spec => {
            const specId = spec._id;
            const matchingProSpec = proSpecDto.find((proSpec) => proSpec.spec_id === specId) || {};
            const mergedSpec = {
                spec_id: specId,
                spec_name: spec.subcat_spec_name || "",
                spec_desc: matchingProSpec.spec_desc || "",
                rating_score: spec.rating_score || [],
                spec_type: spec.cat_type || "",
                prefix: spec.prefix || "",
                suffix: spec.suffix || "",
                score: matchingProSpec.score ?? (spec.rating_score.length && status !== product_constant_1.ProductConstant.REJECTED
                    ? this.calculateRecommendScore(matchingProSpec.spec_desc || "", spec.rating_score)
                    : null),
                subspecification: []
            };
            const finalSubspecifications = [];
            const subspecDetails = matchingProSpec.subspecification || [];
            spec.children?.forEach(child => {
                const subspecId = child._id;
                const matchingSubspec = subspecDetails.find((subspec) => subspec.subspec_id === subspecId) || {};
                const mergedSubspec = {
                    subspec_id: subspecId,
                    subspec_name: child.subcat_subspec_name || "",
                    subspec_desc: matchingSubspec.subspec_desc || "",
                    rating_score: child.rating_score || [],
                    prefix: child.prefix || "",
                    suffix: child.suffix || "",
                    spec_id: specId,
                    score: matchingSubspec.score ?? (child.rating_score.length && status !== product_constant_1.ProductConstant.REJECTED
                        ? this.calculateRecommendScore(matchingSubspec.subspec_desc || "", child.rating_score)
                        : null),
                };
                finalSubspecifications.push(mergedSubspec);
            });
            mergedSpec.subspecification = finalSubspecifications;
            finalSpecDetails.push(mergedSpec);
        });
        return finalSpecDetails;
    }
    calculateRecommendScore(value, ratingScore) {
        let maxScore = 0;
        ratingScore.forEach(rating => {
            let score = 0;
            switch (rating.action) {
                case category_constant_1.CategoryConstant.RATING_HAVE_VALUE:
                    score = rating.score;
                    break;
                case category_constant_1.CategoryConstant.RATING_CONTAINS:
                    score = value.includes(rating.value) ? rating.score : 0;
                    break;
                case category_constant_1.CategoryConstant.RATING_EQUAL_TO:
                    score = parseInt(value) === parseInt(rating.value) ? rating.score : 0;
                    break;
                case category_constant_1.CategoryConstant.RATING_MORE_THAN:
                    score = parseInt(value) >= parseInt(rating.value) ? rating.score : 0;
                    break;
                case category_constant_1.CategoryConstant.RATING_LESS_THAN:
                    score = parseInt(value) <= parseInt(rating.value) ? rating.score : 0;
                    break;
            }
            maxScore = Math.max(maxScore, score);
        });
        return maxScore;
    }
    async getProductVerificationListByFilter(req, productListFilterDto) {
        productListFilterDto.owner_id = String(req.user);
        const productList = await this.productVerificationRepository.getProductByFilter(productListFilterDto);
        if (object_utils_1.ObjectUtils.isEmpty(productList)) {
            return [];
        }
        const [subcatIdToNameMap, usernameMap] = await Promise.all([
            this.getCategoryAndSubcategoryMapByCatIds(productListFilterDto.cat_ids ?? []),
            this.getUsernameMapByUserIds(productList.flatMap(product => product.reviewed_by ? [product.owner_id, product.reviewed_by] : [product.owner_id]))
        ]);
        const result = productList.map(product => {
            const subcatData = subcatIdToNameMap.get(product.subcat_id);
            return {
                ...product.toObject(),
                owner_username: usernameMap.get(product.owner_id),
                admin_username: usernameMap.get(product.reviewed_by),
                subcat_name: subcatData?.subcat_name || null,
                cat_name: subcatData?.cat_name || null
            };
        });
        return this.productMapper.mapSchemaListToDtoList(result, product_dto_1.ProductDto);
    }
    async getCategoryAndSubcategoryMapByCatIds(catIds) {
        const catNames = await this.categoryService.findAllSubcategoryNameByIds(catIds);
        return catNames.reduce((map, cat) => {
            if (cat.subcat_id) {
                map.set(cat.subcat_id, { subcat_name: cat.subcat_name, cat_name: cat.cat_name });
            }
            return map;
        }, new Map());
    }
    async getUsernameMapByUserIds(userIds) {
        const userList = await this.authenticationService.findAllUsersByFilter({ user_id: { $in: userIds } });
        return userList.reduce((map, user) => {
            map.set(user.user_id, user.username);
            return map;
        }, new Map());
    }
    async updateProductVerificationDetailsById(req, id, productDto) {
        const username = String(req.user);
        const updateProductSpec = await this.productVerificationSpecificationRepository.updateProductSpecifications(id, productDto.specification);
        const updateProduct = {
            ...productDto,
            last_updated_on: new Date(),
            last_updated_by: username
        };
        const product = await this.productVerificationRepository.update(id, updateProduct);
        return object_utils_1.ObjectUtils.isNotEmpty(product) && updateProductSpec;
    }
    async updateProductVerificationReviewById(req, id, productDto) {
        const username = String(req.user);
        const updateProductData = {
            reviewed_on: new Date(),
            reviewed_by: username,
            status: productDto.status,
            rejected_reason: productDto.rejected_reason ?? null
        };
        let updateProductSpec = true;
        if ([product_constant_1.ProductConstant.APPROVED, product_constant_1.ProductConstant.PENDING].includes(productDto.status)) {
            if (productDto.status === product_constant_1.ProductConstant.APPROVED) {
                Object.assign(updateProductData, {
                    rating: productDto.rating,
                    total_score: productDto.total_score
                });
                await this.createProduct(productDto);
            }
            updateProductSpec = await this.productVerificationSpecificationRepository.updateProductSpecificationsScore(id, productDto.specification);
        }
        const product = await this.productVerificationRepository.update(id, updateProductData);
        return object_utils_1.ObjectUtils.isNotEmpty(product) && updateProductSpec;
    }
    async deleteProductVerificationDetailsById(id) {
        const specResult = await this.productVerificationSpecificationRepository.deleteProductSpecificationByVerificationId(id);
        const productResult = await this.productVerificationRepository.delete(id);
        return object_utils_1.ObjectUtils.isNotEmpty(productResult) && object_utils_1.ObjectUtils.isNotEmpty(specResult);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(category_service_1.CategoryService.name)),
    __param(6, (0, common_1.Inject)(subcategory_specification_service_1.SubcategorySpecificationService.name)),
    __param(7, (0, common_1.Inject)(authentication_service_1.AuthenticationService.name)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        product_specification_repository_1.ProductSpecificationRepository,
        product_verification_respository_1.ProductVerificationRepository,
        product_verification_specification_repository_1.ProductVerificationSpecificationRepository,
        product_mapper_1.ProductMapper, Object, Object, Object])
], ProductService);
//# sourceMappingURL=product.service.js.map