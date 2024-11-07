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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const report_repository_1 = require("../../domain/repositories/report.repository");
const report_dto_1 = require("../../dtos/report.dto");
const object_utils_1 = require("../../../../common/utils/object.utils");
const ReportMapper_1 = require("../mapper/ReportMapper");
const uuid_1 = require("uuid");
const report_exception_1 = require("../../../../common/exception/report.exception");
const report_constant_1 = require("../../../../common/constant/report.constant");
let ReportService = class ReportService {
    constructor(reportRepository, reportMapper) {
        this.reportRepository = reportRepository;
        this.reportMapper = reportMapper;
    }
    async createReport(reportDto) {
        const _id = (0, uuid_1.v4)();
        const result = await this.reportRepository.create({ ...reportDto, _id });
        return object_utils_1.ObjectUtils.isNotEmpty(result);
    }
    async getReportDetails(id) {
        const report = await this.reportRepository.findOneById(id);
        if (object_utils_1.ObjectUtils.isEmpty(report)) {
            throw new report_exception_1.ReportException(report_exception_1.ReportErrorConstant.REPORT_NOT_FOUND);
        }
        return this.reportMapper.mapSchemaToModel(report.toObject(), report_dto_1.ReportDto);
    }
    async getSupplierReportListByFilter(req, filterDto) {
        const userId = String(req.user);
        const reportList = await this.reportRepository.filterSupplierReportListByUserId(userId, filterDto);
        return this.reportMapper.mapSchemaListToDtoList(reportList, report_dto_1.ReportDto);
    }
    async getAdminReportListByFilter(filterDto) {
        const result = await this.reportRepository.filterAdminReportListByFilter(filterDto);
        return this.reportMapper.mapSchemaListToDtoList(result, report_dto_1.ReportDto);
    }
    async updateReportStatus(req, id, reportDto) {
        if (object_utils_1.ObjectUtils.isEmpty(reportDto)) {
            throw new report_exception_1.ReportException(report_exception_1.ReportErrorConstant.INVALID_REPORT);
        }
        if (reportDto.adm_status === report_constant_1.ReportConstant.NOTIFIED) {
            reportDto.sup_status = report_constant_1.ReportConstant.PENDING;
        }
        else if (reportDto.adm_status === report_constant_1.ReportConstant.CLOSED) {
            reportDto.sup_status = report_constant_1.ReportConstant.CLOSED;
        }
        reportDto.reviewed_by = String(req.user);
        reportDto.reviewed_on = new Date();
        const report = await this.reportRepository.update(id, reportDto);
        return object_utils_1.ObjectUtils.isNotEmpty(report);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_repository_1.ReportRepository,
        ReportMapper_1.ReportMapper])
], ReportService);
//# sourceMappingURL=report.service.js.map