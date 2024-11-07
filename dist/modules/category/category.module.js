"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./services/implementations/category.service");
const mongoose_1 = require("@nestjs/mongoose");
const category_schema_1 = require("./domain/schema/category.schema");
const category_repository_1 = require("./domain/repositories/category.repository");
const category_controller_1 = require("./controllers/category.controller");
const subcategory_schema_1 = require("./domain/schema/subcategory.schema");
const subcategory_specification_schema_1 = require("./domain/schema/subcategory-specification.schema");
const subcategory_subspecification_schema_1 = require("./domain/schema/subcategory-subspecification.schema");
const category_base_specification_schema_1 = require("./domain/schema/category-base-specification.schema");
const category_base_subspecification_schema_1 = require("./domain/schema/category-base-subspecification.schema");
const category_general_specification_schema_1 = require("./domain/schema/category-general-specification.schema");
const category_general_subspecification_schema_1 = require("./domain/schema/category-general-subspecification.schema");
const category_base_specification_repository_1 = require("./domain/repositories/category-base-specification.repository");
const category_general_specification_repository_1 = require("./domain/repositories/category-general-specification.repository");
const category_general_subspecification_repository_1 = require("./domain/repositories/category-general-subspecification.repository");
const category_base_subspecification_repository_1 = require("./domain/repositories/category-base-subspecification.repository");
const subcategory_subspecification_repository_1 = require("./domain/repositories/subcategory-subspecification.repository");
const subcategory_specification_repository_1 = require("./domain/repositories/subcategory-specification.repository");
const subcategory_repository_1 = require("./domain/repositories/subcategory.repository");
const sequence_module_1 = require("../sequence/sequence.module");
const general_specification_service_1 = require("./services/implementations/general-specification.service");
const base_specification_service_1 = require("./services/implementations/base-specification.service");
const subcategory_specification_service_1 = require("./services/implementations/subcategory-specification.service");
const category_mapper_1 = require("./services/mapper/category.mapper");
const authentication_module_1 = require("../authentication/authentication.module");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: category_base_specification_schema_1.CategoryBaseSpecification.name, schema: category_base_specification_schema_1.CategoryBaseSpecificationSchema, },
                { name: category_base_subspecification_schema_1.CategoryBaseSubspecification.name, schema: category_base_subspecification_schema_1.CategoryBaseSubspecificationSchema, },
                { name: category_general_specification_schema_1.CategoryGeneralSpecification.name, schema: category_general_specification_schema_1.CategoryGeneralSpecificationSchema, },
                { name: category_general_subspecification_schema_1.CategoryGeneralSubspecification.name, schema: category_general_subspecification_schema_1.CategoryGeneralSubspecificationSchema, },
                { name: subcategory_schema_1.Subcategory.name, schema: subcategory_schema_1.SubcategorySchema },
                { name: subcategory_specification_schema_1.SubcategorySpecification.name, schema: subcategory_specification_schema_1.SubcategorySpecificationSchema, },
                { name: subcategory_subspecification_schema_1.SubcategorySubspecification.name, schema: subcategory_subspecification_schema_1.SubcategorySubspecificationSchema, },
            ]),
            sequence_module_1.SequenceModule,
            authentication_module_1.AuthenticationModule,
        ],
        controllers: [category_controller_1.CategoryController],
        exports: [category_service_1.CategoryService.name, subcategory_specification_service_1.SubcategorySpecificationService.name],
        providers: [
            { provide: category_service_1.CategoryService.name, useClass: category_service_1.CategoryService },
            { provide: general_specification_service_1.GeneralSpecificationService.name, useClass: general_specification_service_1.GeneralSpecificationService },
            { provide: base_specification_service_1.BaseSpecificationService.name, useClass: base_specification_service_1.BaseSpecificationService },
            { provide: subcategory_specification_service_1.SubcategorySpecificationService.name, useClass: subcategory_specification_service_1.SubcategorySpecificationService },
            category_repository_1.CategoryRepository,
            category_base_specification_repository_1.CategoryBaseSpecificationRepository,
            category_base_subspecification_repository_1.CategoryBaseSubspecificationRepository,
            category_general_specification_repository_1.CategoryGeneralSpecificationRepository,
            category_general_subspecification_repository_1.CategoryGeneralSubspecificationRepository,
            subcategory_repository_1.SubcategoryRepository,
            subcategory_specification_repository_1.SubcategorySpecificationRepository,
            subcategory_subspecification_repository_1.SubcategorySubspecificationRepository,
            category_mapper_1.CategoryMapper,
        ],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map