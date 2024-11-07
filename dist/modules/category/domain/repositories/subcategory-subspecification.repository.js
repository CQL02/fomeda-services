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
exports.SubcategorySubspecificationRepository = void 0;
const common_1 = require("@nestjs/common");
const repository_abstract_1 = require("../../../../common/database/abstracts/repository.abstract");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subcategory_subspecification_schema_1 = require("../schema/subcategory-subspecification.schema");
let SubcategorySubspecificationRepository = class SubcategorySubspecificationRepository extends repository_abstract_1.AbstractRepository {
    constructor(subcategorySubspecificationModel) {
        super(subcategorySubspecificationModel);
        this.subcategorySubspecificationModel = subcategorySubspecificationModel;
    }
    async deactivateSubcategorySubspecificationById(req, id, is_active) {
        return this.subcategorySubspecificationModel.findByIdAndUpdate(id, {
            is_active: is_active,
            last_updated_on: new Date(),
            last_updated_by: req.user,
        }).exec();
    }
    async deleteSubcategorySubspecificationBySpecId(subcat_spec_id) {
        return this.subcategorySubspecificationModel.deleteMany({ subcat_spec_id: subcat_spec_id }).exec();
    }
    async findAllByFilterWithUsername(filter) {
        return this.subcategorySubspecificationModel.aggregate([
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
exports.SubcategorySubspecificationRepository = SubcategorySubspecificationRepository;
exports.SubcategorySubspecificationRepository = SubcategorySubspecificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subcategory_subspecification_schema_1.SubcategorySubspecification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubcategorySubspecificationRepository);
//# sourceMappingURL=subcategory-subspecification.repository.js.map