import { IReportService } from "../services/interfaces/report.service.interface";
import { ReportDto } from "../dtos/report.dto";
import { ReportFilterDto } from "../dtos/report-filter.dto";
import { Request } from "express";
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: IReportService);
    createReport(reportDto: ReportDto): Promise<boolean>;
    getReportDetails(id: string): Promise<ReportDto>;
    getSupplierReportListByFilter(req: Request, filterDto: ReportFilterDto): Promise<ReportDto[]>;
    getAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]>;
    updateReportStatus(req: Request, id: string, updateReportDto: ReportDto): Promise<boolean>;
}
