import { Injectable } from "@nestjs/common";
import { IReportService } from "../interfaces/report.service.interface";
import { ReportRepository } from "../../domain/repositories/report.repository";
import { ReportDto } from "../../dtos/report.dto";
import { ReportFilterDto } from "../../dtos/report-filter.dto";
import { ObjectUtils } from "../../../../common/utils/object.utils";
import { ReportMapper } from "../mapper/ReportMapper";
import { v4 as uuidv4 } from "uuid";
import { ReportErrorConstant, ReportException } from "../../../../common/exception/report.exception";
import { ReportConstant } from "../../../../common/constant/report.constant";

@Injectable()
export class ReportService implements IReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly reportMapper: ReportMapper
  ) {
  }

  async createReport(reportDto: ReportDto): Promise<boolean> {
    const _id = uuidv4();

    const result = await this.reportRepository.create({ ...reportDto, _id });
    return ObjectUtils.isNotEmpty(result);
  }

  async getReportDetails(id: string): Promise<ReportDto> {
    const report = await this.reportRepository.findOneById(id);
    if (ObjectUtils.isEmpty(report)) {
      throw new ReportException(ReportErrorConstant.REPORT_NOT_FOUND);
    }

    return this.reportMapper.mapSchemaToModel(report.toObject(), ReportDto);
  }

  async getSupplierReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]> {
    //TODO: get userId
    const userId = "cc49f722-7806-4557-96a2-d79bb55b5dd1";

    const reportList = await this.reportRepository.filterSupplierReportListByUserId(userId, filterDto);
    return this.reportMapper.mapSchemaListToDtoList(reportList, ReportDto);
  }

  async getAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]> {
    const result = await this.reportRepository.filterAdminReportListByFilter(filterDto);
    return this.reportMapper.mapSchemaListToDtoList(result, ReportDto);
  }

  async updateReportStatus(id: string, reportDto: ReportDto): Promise<boolean> {
    if (ObjectUtils.isEmpty(reportDto)) {
      throw new ReportException(ReportErrorConstant.INVALID_REPORT);
    }

    if (reportDto.adm_status === ReportConstant.NOTIFIED) {
      reportDto.sup_status = ReportConstant.PENDING;
    } else if (reportDto.adm_status === ReportConstant.CLOSED) {
      reportDto.sup_status = ReportConstant.CLOSED;
    }

    //TODO: get userId
    const userId = "cc49f722-7806-4557-96a2-d79bb55b5dd1";
    reportDto.reviewed_by = userId;
    reportDto.reviewed_on = new Date();

    const report = await this.reportRepository.update(id, reportDto);
    return ObjectUtils.isNotEmpty(report);
  }
}