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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryBaseSubspecificationSchema = exports.CategoryBaseSubspecification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_abstract_1 = require("../../../../common/database/abstracts/schema.abstract");
const rating_score_schema_1 = require("./rating_score.schema");
let CategoryBaseSubspecification = class CategoryBaseSubspecification extends schema_abstract_1.SchemaAbstract {
};
exports.CategoryBaseSubspecification = CategoryBaseSubspecification;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "subcat_spec_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "subcat_subspec_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "created_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], CategoryBaseSubspecification.prototype, "created_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "last_updated_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], CategoryBaseSubspecification.prototype, "last_updated_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], CategoryBaseSubspecification.prototype, "is_active", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], CategoryBaseSubspecification.prototype, "allow_input", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], CategoryBaseSubspecification.prototype, "is_required", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "prefix", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "suffix", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], CategoryBaseSubspecification.prototype, "field_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], CategoryBaseSubspecification.prototype, "is_score_contributed", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [rating_score_schema_1.RatingScore],
    }),
    __metadata("design:type", Array)
], CategoryBaseSubspecification.prototype, "rating_score", void 0);
exports.CategoryBaseSubspecification = CategoryBaseSubspecification = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'category_base_subspecification' })
], CategoryBaseSubspecification);
exports.CategoryBaseSubspecificationSchema = mongoose_1.SchemaFactory.createForClass(CategoryBaseSubspecification);
//# sourceMappingURL=category-base-subspecification.schema.js.map