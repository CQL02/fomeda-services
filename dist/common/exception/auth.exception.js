"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthException = exports.AuthErrorMessage = exports.AuthErrorConstant = void 0;
const common_1 = require("@nestjs/common");
var AuthErrorConstant;
(function (AuthErrorConstant) {
    AuthErrorConstant[AuthErrorConstant["USER_NOT_FOUND"] = 3001] = "USER_NOT_FOUND";
    AuthErrorConstant[AuthErrorConstant["INVALID_STATUS"] = 3002] = "INVALID_STATUS";
    AuthErrorConstant[AuthErrorConstant["INVALID_SESSION"] = 3003] = "INVALID_SESSION";
    AuthErrorConstant[AuthErrorConstant["INVALID_ROLE"] = 3004] = "INVALID_ROLE";
    AuthErrorConstant[AuthErrorConstant["INVALID_OLD_PASSWORD"] = 3005] = "INVALID_OLD_PASSWORD";
})(AuthErrorConstant || (exports.AuthErrorConstant = AuthErrorConstant = {}));
exports.AuthErrorMessage = {
    [AuthErrorConstant.USER_NOT_FOUND]: 'User not found',
    [AuthErrorConstant.INVALID_STATUS]: 'Invalid status',
    [AuthErrorConstant.INVALID_SESSION]: 'Invalid session',
    [AuthErrorConstant.INVALID_ROLE]: 'Invalid role',
    [AuthErrorConstant.INVALID_OLD_PASSWORD]: 'Invalid old password'
};
class AuthException extends common_1.HttpException {
    constructor(error) {
        const errorMessage = exports.AuthErrorMessage[error];
        super({
            errorCode: error,
            message: errorMessage,
        }, common_1.HttpStatus.BAD_REQUEST);
        this.logger = new common_1.Logger(AuthException.name);
        this.logger.error(`Error ${error}: ${errorMessage}\nStack Trace: ${this.stack}`);
    }
}
exports.AuthException = AuthException;
//# sourceMappingURL=auth.exception.js.map