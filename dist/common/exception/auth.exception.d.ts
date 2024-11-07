import { HttpException } from "@nestjs/common";
export declare enum AuthErrorConstant {
    USER_NOT_FOUND = 3001,
    INVALID_STATUS = 3002,
    INVALID_SESSION = 3003,
    INVALID_ROLE = 3004,
    INVALID_OLD_PASSWORD = 3005
}
export declare const AuthErrorMessage: {
    3001: string;
    3002: string;
    3003: string;
    3004: string;
    3005: string;
};
export declare class AuthException extends HttpException {
    private readonly logger;
    constructor(error: AuthErrorConstant);
}
