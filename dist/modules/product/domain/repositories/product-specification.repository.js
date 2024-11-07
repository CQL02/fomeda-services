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
exports.ProductSpecificationRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_specification_schema_1 = require("../schema/product-specification.schema");
let ProductSpecificationRepository = class ProductSpecificationRepository extends repository_abstract_1.AbstractRepository {
    constructor(productSpecificationModel) {
        super(productSpecificationModel);
        this.productSpecificationModel = productSpecificationModel;
    }
    async createList(productSpecificationDto) {
        return await this.productSpecificationModel.insertMany(productSpecificationDto);
    }
    async updateProductSpecifications(productId, specification) {
        try {
            const operations = specification.map(spec => {
                const { spec_id, spec_desc, subspecification } = spec;
                const subspecUpdates = subspecification ? subspecification.map(subspec => {
                    return {
                        updateOne: {
                            filter: { pro_id: productId, spec_id: spec_id, 'subspecification.subspec_id': subspec.subspec_id },
                            update: { $set: { 'subspecification.$.subspec_desc': subspec.subspec_desc } },
                            upsert: false
                        }
                    };
                }) : [];
                const mainSpecUpdate = {
                    updateOne: {
                        filter: { pro_id: productId, spec_id: spec_id },
                        update: { $set: { spec_desc } },
                        upsert: true,
                    }
                };
                return [mainSpecUpdate, ...subspecUpdates];
            });
            const flattenedOperations = operations.flat();
            const result = await this.productSpecificationModel.bulkWrite(flattenedOperations);
            return result.modifiedCount > 0;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async deleteProductSpecificationByProId(pro_id) {
        return this.productSpecificationModel.deleteMany({ pro_id: pro_id }).exec();
    }
};
exports.ProductSpecificationRepository = ProductSpecificationRepository;
exports.ProductSpecificationRepository = ProductSpecificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_specification_schema_1.ProductSpecification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductSpecificationRepository);
//# sourceMappingURL=product-specification.repository.js.map