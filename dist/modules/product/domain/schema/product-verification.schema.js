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
exports.ProductVerificationSchema = exports.ProductVerification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_abstract_1 = require("../../../../common/database/abstracts/schema.abstract");
let ProductVerification = class ProductVerification extends schema_abstract_1.SchemaAbstract {
};
exports.ProductVerification = ProductVerification;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "pro_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "product_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "model_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "subcat_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "owner_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
    }),
    __metadata("design:type", Object)
], ProductVerification.prototype, "product_img", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], ProductVerification.prototype, "last_updated_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "last_updated_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], ProductVerification.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], ProductVerification.prototype, "total_score", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "reviewed_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
    }),
    __metadata("design:type", Date)
], ProductVerification.prototype, "reviewed_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ProductVerification.prototype, "rejected_reason", void 0);
exports.ProductVerification = ProductVerification = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'product_verification' })
], ProductVerification);
exports.ProductVerificationSchema = mongoose_1.SchemaFactory.createForClass(ProductVerification);
//# sourceMappingURL=product-verification.schema.js.map