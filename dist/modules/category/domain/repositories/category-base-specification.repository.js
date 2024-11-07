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
exports.CategoryBaseSpecificationRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_base_specification_schema_1 = require("../schema/category-base-specification.schema");
let CategoryBaseSpecificationRepository = class CategoryBaseSpecificationRepository extends repository_abstract_1.AbstractRepository {
    constructor(categoryBaseSpecificationModel) {
        super(categoryBaseSpecificationModel);
        this.categoryBaseSpecificationModel = categoryBaseSpecificationModel;
    }
    async deactivateCategoryBaseSpecificationById(req, id, is_active) {
        return this.categoryBaseSpecificationModel.findByIdAndUpdate(id, {
            is_active: is_active,
            last_updated_on: new Date(),
            last_updated_by: req.user,
        }).exec();
    }
    async findAllByFilterWithUsername(filter) {
        return this.categoryBaseSpecificationModel.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "user",
                    localField: "created_by",
                    foreignField: "user_id",
                    as: "created_user"
                }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "last_updated_by",
                    foreignField: "user_id",
                    as: "last_updated_user"
                }
            },
            {
                $addFields: {
                    created_name: { $arrayElemAt: ["$created_user.username", 0] },
                    last_updated_name: { $arrayElemAt: ["$last_updated_user.username", 0] }
                }
            },
            {
                $project: {
                    created_user: 0,
                    last_updated_user: 0
                }
            }
        ]);
    }
};
exports.CategoryBaseSpecificationRepository = CategoryBaseSpecificationRepository;
exports.CategoryBaseSpecificationRepository = CategoryBaseSpecificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_base_specification_schema_1.CategoryBaseSpecification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryBaseSpecificationRepository);
//# sourceMappingURL=category-base-specification.repository.js.map