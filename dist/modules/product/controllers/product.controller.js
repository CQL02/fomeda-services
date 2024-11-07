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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../services/implementations/product.service");
const product_dto_1 = require("../dtos/product.dto");
const product_list_filter_dto_1 = require("../dtos/product-list-filter.dto");
const consumer_service_1 = require("../services/implementations/consumer.service");
const consumer_product_filter_dto_1 = require("../dtos/consumer-product-filter.dto");
const authentication_guard_1 = require("../../authentication/passport/authentication.guard");
let ProductController = class ProductController {
    constructor(productService, consumerService) {
        this.productService = productService;
        this.consumerService = consumerService;
    }
    async createProduct(productDto) {
        return await this.productService.createProduct(productDto);
    }
    async getProductById(id) {
        return await this.productService.getProductDetailsById(id);
    }
    async getProductByFilter(req, productListFilterDto) {
        return await this.productService.getProductListByFilter(req, productListFilterDto);
    }
    async updateProductById(id, productDto) {
        return await this.productService.updateProductDetailsById(id, productDto);
    }
    async updateProductIsActive(id) {
        return await this.productService.updateProductIsActive(id);
    }
    async deleteProductById(id) {
        return await this.productService.deleteProductById(id);
    }
    async createProductVerification(req, productDto) {
        return await this.productService.createProductVerification(req, productDto);
    }
    async getProductVerificationDetailsById(id) {
        return await this.productService.getProductVerificationDetailsById(id);
    }
    async getProductVerificationDetailsByFilter(req, productListFilterDto) {
        return await this.productService.getProductVerificationListByFilter(req, productListFilterDto);
    }
    async updateProductVerificationDetailsById(req, id, productDto) {
        return await this.productService.updateProductVerificationDetailsById(req, id, productDto);
    }
    async updateProductVerificationReviewById(req, id, productDto) {
        return await this.productService.updateProductVerificationReviewById(req, id, productDto);
    }
    async deleteProductVerificationDetailsById(id) {
        return await this.productService.deleteProductVerificationDetailsById(id);
    }
    async getConsumerProductByFilter(skip, limit, filter) {
        return await this.consumerService.getConsumerProductByFilter(filter, skip, limit);
    }
    async getConsumerSpecificationFilterBySubcatId(subcat_id) {
        return await this.consumerService.getConsumerSpecificationFilterBySubcatId(subcat_id);
    }
    async getConsumerComparedProduct(subcat_id, ids) {
        return await this.consumerService.getConsumerComparedProduct(subcat_id, ids);
    }
    async getProductDetails(id) {
        return await this.consumerService.getProductDetails(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)("create-product"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)("get-product-details-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("get-product-list-by-filter"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_list_filter_dto_1.ProductListFilterDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByFilter", null);
__decorate([
    (0, common_1.Put)("update-product-details-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductById", null);
__decorate([
    (0, common_1.Put)("update-product-is-active"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductIsActive", null);
__decorate([
    (0, common_1.Delete)("delete-product-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("create-product-verification"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductVerification", null);
__decorate([
    (0, common_1.Get)("get-product-verification-details-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductVerificationDetailsById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("get-product-verification-list-by-filter"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_list_filter_dto_1.ProductListFilterDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductVerificationDetailsByFilter", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-product-verification-details-by-id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductVerificationDetailsById", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-product-verification-review-by-id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductVerificationReviewById", null);
__decorate([
    (0, common_1.Delete)("delete-product-verification-details-by-id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductVerificationDetailsById", null);
__decorate([
    (0, common_1.Post)("get-consumer-product-by-filter"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, consumer_product_filter_dto_1.ConsumerProductFilterDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getConsumerProductByFilter", null);
__decorate([
    (0, common_1.Get)("get-consumer-specification-filter-by-subcat_id"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getConsumerSpecificationFilterBySubcatId", null);
__decorate([
    (0, common_1.Get)("get-consumer-compared-product"),
    __param(0, (0, common_1.Query)("subcat_id")),
    __param(1, (0, common_1.Query)("ids")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getConsumerComparedProduct", null);
__decorate([
    (0, common_1.Get)("get-product-details"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductDetails", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)("product"),
    __param(0, (0, common_1.Inject)(product_service_1.ProductService.name)),
    __param(1, (0, common_1.Inject)(consumer_service_1.ConsumerService.name)),
    __metadata("design:paramtypes", [Object, consumer_service_1.ConsumerService])
], ProductController);
//# sourceMappingURL=product.controller.js.map