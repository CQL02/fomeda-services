import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export enum ProductErrorConstant {
  INVALID_PRODUCT = 2001,
  PRODUCT_NOT_FOUND = 2002,
  PRODUCT_ID_IS_EMPTY = 2003,
  FAILED_TO_ACTIVATE = 2004,
  MINIMUM_PRODUCT_NOT_ARCHIVED = 2005,
  REJECT_REASON_MISSING = 2006,
  MINIMUM_STAR_RATING_NOT_ARCHIVED = 2007,
}

export const ProductErrorMessage = {
  [ProductErrorConstant.INVALID_PRODUCT]: 'Product is invalid',
  [ProductErrorConstant.PRODUCT_NOT_FOUND]: 'Product Not Found',
  [ProductErrorConstant.PRODUCT_ID_IS_EMPTY]: 'Product ID is empty',
  [ProductErrorConstant.FAILED_TO_ACTIVATE]: 'Product Failed to Activate',
  [ProductErrorConstant.MINIMUM_PRODUCT_NOT_ARCHIVED]: 'At least 2 products is needed to compare',
  [ProductErrorConstant.REJECT_REASON_MISSING]: 'Reject reason is required',
  [ProductErrorConstant.MINIMUM_STAR_RATING_NOT_ARCHIVED]: 'Minimum 1 Star is required to approve',
}

export class ProductException extends HttpException {
  private readonly logger = new Logger(ProductException.name);

  constructor(error: ProductErrorConstant) {
    const errorMessage = ProductErrorMessage[error]
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

