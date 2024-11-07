import { HttpException } from "@nestjs/common";
export declare enum ReportErrorConstant {
    REPORT_NOT_FOUND = 4001,
    INVALID_REPORT = 4002
}
export declare const ReportErrorMessage: {
    4001: string;
    4002: string;
};
export declare class ReportException extends HttpException {
    private readonly logger;
    constructor(error: ReportErrorConstant);
}
