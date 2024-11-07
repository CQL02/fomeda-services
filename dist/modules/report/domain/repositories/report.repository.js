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
exports.ReportRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const report_schema_1 = require("../schema/report.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ReportRepository = class ReportRepository extends repository_abstract_1.AbstractRepository {
    constructor(reportModel) {
        super(reportModel);
        this.reportModel = reportModel;
    }
    buildAggregationPipeline(userId, filterDto) {
        const { search, subcat_ids, adm_status_list } = filterDto || {};
        const matchStage = { adm_status: { $in: adm_status_list } };
        const pipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: "product",
                    let: { productId: "$pro_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$_id", "$$productId"] },
                                        ...(userId ? [{ $eq: ["$owner_id", userId] }] : [])
                                    ]
                                }
                            }
                        },
                        { $project: { product_name: 1, model_no: 1, subcat_id: 1, owner_id: 1 } }
                    ],
                    as: "product_data"
                }
            },
            { $unwind: { path: "$product_data", preserveNullAndEmptyArrays: false } }
        ];
        if (subcat_ids && subcat_ids.length > 0) {
            pipeline.push({
                $match: {
                    "product_data.subcat_id": { $in: subcat_ids }
                }
            });
        }
        pipeline.push({
            $lookup: {
                from: "subcategory",
                let: { subcatId: "$product_data.subcat_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$subcatId"] } } },
                    { $project: { subcat_name: 1, cat_id: 1 } }
                ],
                as: "subcategory_data"
            }
        }, { $unwind: { path: "$subcategory_data", preserveNullAndEmptyArrays: true } }, {
            $lookup: {
                from: "category",
                let: { catId: "$subcategory_data.cat_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$catId"] } } },
                    { $project: { cat_name: 1 } }
                ],
                as: "category_data"
            }
        }, { $unwind: { path: "$category_data", preserveNullAndEmptyArrays: true } }, {
            $lookup: {
                from: "user",
                let: { reviewerId: "$reviewed_by" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$user_id", "$$reviewerId"] } } },
                    { $project: { username: 1 } }
                ],
                as: "user_data"
            }
        }, { $unwind: { path: "$user_data", preserveNullAndEmptyArrays: true } }, {
            $project: {
                _id: 1,
                created_on: 1,
                sup_status: 1,
                adm_status: 1,
                reviewed_on: 1,
                pro_id: 1,
                reviewed_by: "$user_data.username",
                product_name: "$product_data.product_name",
                model_no: "$product_data.model_no",
                subcat_name: "$subcategory_data.subcat_name",
                cat_name: "$category_data.cat_name"
            }
        });
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { product_name: { $regex: search, $options: "i" } },
                        { model_no: { $regex: search, $options: "i" } }
                    ]
                }
            });
        }
        return pipeline;
    }
    async filterSupplierReportListByUserId(userId, filterDto) {
        const pipeline = this.buildAggregationPipeline(userId, filterDto);
        return await this.reportModel.aggregate(pipeline).exec();
    }
    async filterAdminReportListByFilter(filterDto) {
        const pipeline = this.buildAggregationPipeline(undefined, filterDto);
        return await this.reportModel.aggregate(pipeline).exec();
    }
};
exports.ReportRepository = ReportRepository;
exports.ReportRepository = ReportRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReportRepository);
//# sourceMappingURL=report.repository.js.map