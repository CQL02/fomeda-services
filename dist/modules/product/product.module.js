"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./domain/schema/product.schema");
const product_specification_schema_1 = require("./domain/schema/product-specification.schema");
const product_controller_1 = require("./controllers/product.controller");
const product_service_1 = require("./services/implementations/product.service");
const product_repository_1 = require("./domain/repositories/product.repository");
const product_specification_repository_1 = require("./domain/repositories/product-specification.repository");
const category_module_1 = require("../category/category.module");
const authentication_module_1 = require("../authentication/authentication.module");
const product_mapper_1 = require("./services/mapper/product.mapper");
const product_verification_schema_1 = require("./domain/schema/product-verification.schema");
const product_verification_specification_schema_1 = require("./domain/schema/product-verification-specification.schema");
const product_verification_respository_1 = require("./domain/repositories/product-verification.respository");
const product_verification_specification_repository_1 = require("./domain/repositories/product-verification-specification.repository");
const consumer_service_1 = require("./services/implementations/consumer.service");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: product_specification_schema_1.ProductSpecification.name, schema: product_specification_schema_1.ProductSpecificationSchema },
                { name: product_verification_schema_1.ProductVerification.name, schema: product_verification_schema_1.ProductVerificationSchema },
                { name: product_verification_specification_schema_1.ProductVerificationSpecification.name, schema: product_verification_specification_schema_1.ProductVerificationSpecificationSchema }
            ]),
            category_module_1.CategoryModule,
            authentication_module_1.AuthenticationModule
        ],
        controllers: [product_controller_1.ProductController],
        providers: [
            { provide: product_service_1.ProductService.name, useClass: product_service_1.ProductService },
            { provide: consumer_service_1.ConsumerService.name, useClass: consumer_service_1.ConsumerService },
            product_repository_1.ProductRepository,
            product_specification_repository_1.ProductSpecificationRepository,
            product_verification_respository_1.ProductVerificationRepository,
            product_verification_specification_repository_1.ProductVerificationSpecificationRepository,
            product_mapper_1.ProductMapper
        ]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map