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
exports.SubcategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subcategory_schema_1 = require("../schema/subcategory.schema");
let SubcategoryRepository = class SubcategoryRepository extends repository_abstract_1.AbstractRepository {
    constructor(subcategoryModel) {
        super(subcategoryModel);
        this.subcategoryModel = subcategoryModel;
    }
    async deactivateSubcategoryById(req, id, is_active) {
        return this.subcategoryModel.findByIdAndUpdate(id, {
            is_active: is_active,
            last_updated_on: new Date(),
            last_updated_by: req.user,
        }).exec();
    }
    async findSubcategoryByCatId(cat_id) {
        return this.subcategoryModel.find({ cat_id: cat_id }).exec();
    }
    async deleteSubcategoryByCatId(cat_id) {
        return this.subcategoryModel.deleteMany({ cat_id: cat_id }).exec();
    }
    async getAllSubcategoryWithUsername() {
        return this.subcategoryModel.aggregate([
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
exports.SubcategoryRepository = SubcategoryRepository;
exports.SubcategoryRepository = SubcategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subcategory_schema_1.Subcategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubcategoryRepository);
//# sourceMappingURL=subcategory.repository.js.map