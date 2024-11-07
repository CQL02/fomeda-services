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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const product_schema_1 = require("../schema/product.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductRepository = class ProductRepository extends repository_abstract_1.AbstractRepository {
    constructor(productModel) {
        super(productModel);
        this.productModel = productModel;
    }
    async getProductByFilter(productListFilterDto) {
        const { owner_id, status, cat_ids, search } = productListFilterDto;
        const filters = {};
        if (owner_id) {
            filters.owner_id = owner_id;
        }
        if (search) {
            filters.$or = [
                { product_name: { $regex: search, $options: "i" } },
                { model_no: { $regex: search, $options: "i" } }
            ];
        }
        if (status) {
            filters.status = { $in: status };
        }
        if (cat_ids && cat_ids.length > 0) {
            filters.subcat_id = { $in: cat_ids };
        }
        return this.productModel.find(filters).exec();
    }
    async getConsumerProductByFilter(filter, skip, limit) {
        const { subcat_id, search, specification, subspecification } = filter;
        const matchStage = { is_active: true, subcat_id };
        if (search) {
            matchStage.$or = [
                { product_name: { $regex: search, $options: "i" } },
                { model_no: { $regex: search, $options: "i" } }
            ];
        }
        const proSpecFilters = [];
        if (specification) {
            const ratingSpec = specification.find((spec) => spec.spec_id === "rating");
            if (ratingSpec) {
                const descArray = ratingSpec.desc_list.map(Number);
                matchStage.$and = [{ rating: { $in: descArray } }];
            }
            specification.forEach(spec => {
                if (spec.spec_id && spec.spec_id !== "rating") {
                    const specFilter = { "specification.spec_id": spec.spec_id };
                    if (spec.desc_list && spec.desc_list.length > 0) {
                        specFilter["specification.spec_desc"] = { $in: spec.desc_list };
                    }
                    else {
                        specFilter["specification.spec_desc"] = { $nin: ["", "-"] };
                    }
                    proSpecFilters.push(specFilter);
                }
            });
        }
        if (subspecification) {
            subspecification.forEach(subspec => {
                if (subspec.spec_id) {
                    const subspecFilter = {
                        "specification.spec_id": subspec.spec_id,
                        "specification.subspecification.subspec_id": subspec.subspec_id
                    };
                    if (subspec.desc_list && subspec.desc_list.length > 0) {
                        subspecFilter["specification.subspecification.subspec_desc"] = { $in: subspec.desc_list };
                    }
                    proSpecFilters.push(subspecFilter);
                }
            });
        }
        const pipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: "product_specification",
                    localField: "_id",
                    foreignField: "pro_id",
                    as: "specification"
                }
            },
            { $unwind: "$specification" }
        ];
        if (proSpecFilters.length > 0) {
            pipeline.push({ $match: { $or: proSpecFilters } });
        }
        pipeline.push({
            $group: {
                _id: "$_id",
                product: { $first: "$$ROOT" }
            }
        }, { $replaceRoot: { newRoot: "$product" } }, { $sort: { rating: -1, product_name: 1 } }, { $project: { specification: 0 } });
        const productsPipeline = [...pipeline, { $skip: Number(skip) }, { $limit: Number(limit) }];
        const products = await this.productModel.aggregate(productsPipeline).exec();
        const totalPipeline = [...pipeline, { $count: "total" }];
        const totalResult = await this.productModel.aggregate(totalPipeline).exec();
        const total = totalResult.length > 0 ? totalResult[0] : 0;
        return { products, total: total.total };
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map