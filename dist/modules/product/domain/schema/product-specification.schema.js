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
exports.ProductSpecificationSchema = exports.ProductSpecification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_abstract_1 = require("../../../../common/database/abstracts/schema.abstract");
const product_subspecification_schema_1 = require("./product-subspecification.schema");
let ProductSpecification = class ProductSpecification extends schema_abstract_1.SchemaAbstract {
};
exports.ProductSpecification = ProductSpecification;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], ProductSpecification.prototype, "pro_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ProductSpecification.prototype, "spec_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], ProductSpecification.prototype, "spec_desc", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], ProductSpecification.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [product_subspecification_schema_1.ProductSubspecification]
    }),
    __metadata("design:type", Array)
], ProductSpecification.prototype, "subspecification", void 0);
exports.ProductSpecification = ProductSpecification = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'product_specification' })
], ProductSpecification);
exports.ProductSpecificationSchema = mongoose_1.SchemaFactory.createForClass(ProductSpecification);
//# sourceMappingURL=product-specification.schema.js.map