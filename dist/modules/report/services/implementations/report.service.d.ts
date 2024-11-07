import { IReportService } from "../interfaces/report.service.interface";
import { ReportRepository } from "../../domain/repositories/report.repository";
import { ReportDto } from "../../dtos/report.dto";
import { ReportFilterDto } from "../../dtos/report-filter.dto";
import { ReportMapper } from "../mapper/ReportMapper";
import { Request } from "express";
export declare class ReportService implements IReportService {
    private readonly reportRepository;
    private readonly reportMapper;
    constructor(reportRepository: ReportRepository, reportMapper: ReportMapper);
    createReport(reportDto: ReportDto): Promise<boolean>;
    getReportDetails(id: string): Promise<ReportDto>;
    getSupplierReportListByFilter(req: Request, filterDto: ReportFilterDto): Promise<ReportDto[]>;
    getAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]>;
    updateReportStatus(req: Request, id: string, reportDto: ReportDto): Promise<boolean>;
}
