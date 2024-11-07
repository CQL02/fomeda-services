import { ReportDto } from "../../dtos/report.dto";
import { ReportFilterDto } from "../../dtos/report-filter.dto";
import { Request } from "express";
export interface IReportService {
    createReport(reportDto: ReportDto): Promise<boolean>;
    getReportDetails(id: string): Promise<ReportDto>;
    getSupplierReportListByFilter(req: Request, filterDto: ReportFilterDto): Promise<ReportDto[]>;
    getAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]>;
    updateReportStatus(req: Request, id: string, reportDto: ReportDto): Promise<boolean>;
}
