import { ReportDto } from "../../dtos/report.dto";
import { ReportFilterDto } from "../../dtos/report-filter.dto";

export interface IReportService {
  createReport(reportDto: ReportDto): Promise<boolean>;
  getReportDetails(id: string): Promise<ReportDto>;
  getSupplierReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]>;
  getAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]>;
  updateReportStatus(id: string, reportDto: ReportDto): Promise<boolean>;
}