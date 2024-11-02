import { Body, Controller, Get, Inject, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ReportService } from "../services/implementations/report.service";
import { IReportService } from "../services/interfaces/report.service.interface";
import { ReportDto } from "../dtos/report.dto";
import { ReportFilterDto } from "../dtos/report-filter.dto";
import { AuthenticationGuard } from "../../authentication/passport/authentication.guard";
import { Request } from "express";

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

  @UseGuards(AuthenticationGuard)
  @Post("get-supplier-report-list-by-filter")
  async getSupplierReportListByFilter(@Req() req: Request, @Body() filterDto: ReportFilterDto): Promise<ReportDto[]> {
    return await this.reportService.getSupplierReportListByFilter(req, filterDto);
  }

  @Post("get-admin-report-list-by-filter")
  async getAdminReportListByFilter(@Body() filterDto: ReportFilterDto): Promise<ReportDto[]> {
    return await this.reportService.getAdminReportListByFilter(filterDto);
  }

  @UseGuards(AuthenticationGuard)
  @Put("update-report-status")
  async updateReportStatus(@Req() req: Request, @Query("id") id: string, @Body() updateReportDto: ReportDto): Promise<boolean> {
    return await this.reportService.updateReportStatus(req, id, updateReportDto);
  }
}