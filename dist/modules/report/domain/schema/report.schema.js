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
exports.ReportSchema = exports.Report = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_abstract_1 = require("../../../../common/database/abstracts/schema.abstract");
const report_constant_1 = require("../../../../common/constant/report.constant");
let Report = class Report extends schema_abstract_1.SchemaAbstract {
};
exports.Report = Report;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Report.prototype, "pro_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Report.prototype, "rpt_title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], Report.prototype, "rpt_reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
    }),
    __metadata("design:type", Object)
], Report.prototype, "rpt_img", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], Report.prototype, "created_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Report.prototype, "sup_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        default: report_constant_1.ReportConstant.PENDING,
    }),
    __metadata("design:type", String)
], Report.prototype, "adm_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
    }),
    __metadata("design:type", Date)
], Report.prototype, "reviewed_on", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Report.prototype, "reviewed_by", void 0);
exports.Report = Report = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'report' })
], Report);
exports.ReportSchema = mongoose_1.SchemaFactory.createForClass(Report);
//# sourceMappingURL=report.schema.js.map