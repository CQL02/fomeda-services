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
exports.ConsumerProductFilterDto = void 0;
const class_validator_1 = require("class-validator");
class ConsumerProductFilterDto {
}
exports.ConsumerProductFilterDto = ConsumerProductFilterDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], ConsumerProductFilterDto.prototype, "subcat_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsumerProductFilterDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ConsumerProductFilterDto.prototype, "specification", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ConsumerProductFilterDto.prototype, "subspecification", void 0);
class SpecificationFilter {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecificationFilter.prototype, "spec_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecificationFilter.prototype, "spec_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecificationFilter.prototype, "spec_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecificationFilter.prototype, "field_type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SpecificationFilter.prototype, "desc_list", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecificationFilter.prototype, "prefix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SpecificationFilter.prototype, "suffix", void 0);
class SubspecificationFilter {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubspecificationFilter.prototype, "spec_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubspecificationFilter.prototype, "subspec_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubspecificationFilter.prototype, "subspec_name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SubspecificationFilter.prototype, "desc_list", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubspecificationFilter.prototype, "field_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubspecificationFilter.prototype, "prefix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubspecificationFilter.prototype, "suffix", void 0);
//# sourceMappingURL=consumer-product-filter.dto.js.map