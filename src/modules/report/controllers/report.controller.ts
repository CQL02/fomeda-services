import { Body, Controller, Get, Inject, Post, Put, Query } from "@nestjs/common";
import { ReportService } from "../services/implementations/report.service";
import { IReportService } from "../services/interfaces/report.service.interface";
import { ReportDto } from "../dtos/report.dto";
import { ReportFilterDto } from "../dtos/report-filter.dto";

@Controller("report")
export class ReportController {
  constructor(
    @Inject(ReportService.name) private readonly reportService: IReportService) {
  }

  @Post("create-report")
  async createReport(@Body() reportDto: ReportDto): Promise<boolean> {
    return await this.reportService.createReport(reportDto);
  }

  @Get("get-report-details")
  async getReportDetails(@Query("id") id: string): Promise<ReportDto> {
    return await this.reportService.getReportDetails(id)
  }

  @Post("get-supplier-report-list-by-filter")
  async getSupplierReportListByFilter(@Body() filterDto: ReportFilterDto): Promise<ReportDto[]> {
    return await this.reportService.getSupplierReportListByFilter(filterDto);
  }

  @Post("get-admin-report-list-by-filter")
  async getAdminReportListByFilter(@Body() filterDto: ReportFilterDto): Promise<ReportDto[]> {
    return await this.reportService.getAdminReportListByFilter(filterDto);
  }

  @Put("update-report-status")
  async updateReportStatus(@Query("id") id: string, @Body() updateReportDto: ReportDto): Promise<boolean> {
    return await this.reportService.updateReportStatus(id, updateReportDto);
  }
}