"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportException = exports.ReportErrorMessage = exports.ReportErrorConstant = void 0;
const common_1 = require("@nestjs/common");
var ReportErrorConstant;
(function (ReportErrorConstant) {
    ReportErrorConstant[ReportErrorConstant["REPORT_NOT_FOUND"] = 4001] = "REPORT_NOT_FOUND";
    ReportErrorConstant[ReportErrorConstant["INVALID_REPORT"] = 4002] = "INVALID_REPORT";
})(ReportErrorConstant || (exports.ReportErrorConstant = ReportErrorConstant = {}));
exports.ReportErrorMessage = {
    [ReportErrorConstant.REPORT_NOT_FOUND]: 'Report Not Found',
    [ReportErrorConstant.INVALID_REPORT]: 'Invalid Report',
};
class ReportException extends common_1.HttpException {
    constructor(error) {
        const errorMessage = exports.ReportErrorMessage[error];
        super({
            errorCode: error,
            message: errorMessage,
        }, common_1.HttpStatus.BAD_REQUEST);
        this.logger = new common_1.Logger(ReportException.name);
        this.logger.error(`Error ${error}: ${errorMessage}\nStack Trace: ${this.stack}`);
    }
}
exports.ReportException = ReportException;
//# sourceMappingURL=report.exception.js.map