import { Inject, Injectable } from "@nestjs/common";
import { IReportService } from "../interfaces/report.service.interface";
import { ReportRepository } from "../../domain/repositories/report.repository";
import { ReportDto } from "../../dtos/report.dto";
import { ReportFilterDto } from "../../dtos/report-filter.dto";
import { ObjectUtils } from "../../../../common/utils/object.utils";
import { ReportMapper } from "../mapper/ReportMapper";
import { v4 as uuidv4 } from "uuid";
import { ReportErrorConstant, ReportException } from "../../../../common/exception/report.exception";
import { ReportConstant } from "../../../../common/constant/report.constant";
import { Request } from "express";
import { ProductService } from "../../../product/services/implementations/product.service";
import { IProductService } from "../../../product/services/interfaces/product.service.interface";
import { StringUtils } from "../../../../common/utils/string.utils";

@Injectable()
export class ReportService implements IReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly reportMapper: ReportMapper,
    @Inject(ProductService.name) private readonly productService: IProductService,
  ) {
  }

  async createReport(reportDto: ReportDto): Promise<boolean> {
    if(StringUtils.isEmpty(reportDto.rpt_title) || StringUtils.isEmpty(reportDto.rpt_reason)) {
      throw new ReportException(ReportErrorConstant.INVALID_REPORT)
    }

    const product = await this.productService.getProductDetailsById(reportDto.pro_id);
    if(ObjectUtils.isEmpty(product)){
      throw new ReportException(ReportErrorConstant.PRODUCT_NOT_EXIST)
    }

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

  async getSupplierReportListByFilter(req: Request, filterDto: ReportFilterDto): Promise<ReportDto[]> {
    const userId = String(req.user);

    const reportList = await this.reportRepository.filterSupplierReportListByUserId(userId, filterDto);
    return this.reportMapper.mapSchemaListToDtoList(reportList, ReportDto);
  }

  async getAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]> {
    const result = await this.reportRepository.filterAdminReportListByFilter(filterDto);
    return this.reportMapper.mapSchemaListToDtoList(result, ReportDto);
  }

  async updateReportStatus(req: Request, id: string, reportDto: ReportDto): Promise<boolean> {
    if (ObjectUtils.isEmpty(reportDto)) {
      throw new ReportException(ReportErrorConstant.INVALID_REPORT);
    }

    const validReport = await this.reportRepository.findOneById(id);
    if(ObjectUtils.isEmpty(validReport)) {
      throw new ReportException(ReportErrorConstant.REPORT_NOT_FOUND);
    }

    if (reportDto.adm_status === ReportConstant.NOTIFIED) {
      reportDto.sup_status = ReportConstant.PENDING;
    } else if (reportDto.adm_status === ReportConstant.CLOSED) {
      reportDto.sup_status = ReportConstant.CLOSED;
    }

    reportDto.reviewed_by = String(req.user);
    reportDto.reviewed_on = new Date();

    const report = await this.reportRepository.update(id, reportDto);
    return ObjectUtils.isNotEmpty(report);
  }
}