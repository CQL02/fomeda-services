import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export enum AuthErrorConstant {
  USER_NOT_FOUND = 3001,
  INVALID_STATUS = 3002,
  INVALID_SESSION = 3003,
  INVALID_ROLE = 3004,
  INVALID_OLD_PASSWORD = 3005
}

export const AuthErrorMessage = {
  [AuthErrorConstant.USER_NOT_FOUND]: 'User not found',
  [AuthErrorConstant.INVALID_STATUS]: 'Invalid status',
  [AuthErrorConstant.INVALID_SESSION]: 'Invalid session',
  [AuthErrorConstant.INVALID_ROLE]: 'Invalid role',
  [AuthErrorConstant.INVALID_OLD_PASSWORD]: 'Invalid old password'
}

export class AuthException extends HttpException {
  private readonly logger = new Logger(AuthException.name);

  constructor(error: AuthErrorConstant) {
    const errorMessage = AuthErrorMessage[error]
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

