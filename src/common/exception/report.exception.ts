import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export enum ReportErrorConstant {
  REPORT_NOT_FOUND = 4001,
  INVALID_REPORT = 4002,
  PRODUCT_NOT_EXIST = 4003,
}

export const ReportErrorMessage = {
  [ReportErrorConstant.REPORT_NOT_FOUND]: 'Report Not Found',
  [ReportErrorConstant.INVALID_REPORT]: 'Invalid Report',
  [ReportErrorConstant.PRODUCT_NOT_EXIST]: 'Product Not Exist',
}

export class ReportException extends HttpException {
  private readonly logger = new Logger(ReportException.name);

  constructor(error: ReportErrorConstant) {
    const errorMessage = ReportErrorMessage[error]
    super (
      {
        errorCode: error,
        message: errorMessage,
      },
      HttpStatus.BAD_REQUEST,
    )
    this.logger.error(`Error ${error}: ${errorMessage}\nStack Trace: ${this.stack}`)
  }
}

