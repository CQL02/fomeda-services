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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("../services/implementations/report.service");
const report_dto_1 = require("../dtos/report.dto");
const report_filter_dto_1 = require("../dtos/report-filter.dto");
const authentication_guard_1 = require("../../authentication/passport/authentication.guard");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async createReport(reportDto) {
        return await this.reportService.createReport(reportDto);
    }
    async getReportDetails(id) {
        return await this.reportService.getReportDetails(id);
    }
    async getSupplierReportListByFilter(req, filterDto) {
        return await this.reportService.getSupplierReportListByFilter(req, filterDto);
    }
    async getAdminReportListByFilter(filterDto) {
        return await this.reportService.getAdminReportListByFilter(filterDto);
    }
    async updateReportStatus(req, id, updateReportDto) {
        return await this.reportService.updateReportStatus(req, id, updateReportDto);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)("create-report"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createReport", null);
__decorate([
    (0, common_1.Get)("get-report-details"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportDetails", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)("get-supplier-report-list-by-filter"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_filter_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getSupplierReportListByFilter", null);
__decorate([
    (0, common_1.Post)("get-admin-report-list-by-filter"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_filter_dto_1.ReportFilterDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getAdminReportListByFilter", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Put)("update-report-status"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, report_dto_1.ReportDto]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "updateReportStatus", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)("report"),
    __param(0, (0, common_1.Inject)(report_service_1.ReportService.name)),
    __metadata("design:paramtypes", [Object])
], ReportController);
//# sourceMappingURL=report.controller.js.map