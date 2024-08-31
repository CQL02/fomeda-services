import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export enum ProductErrorConstant {
  INVALID_PRODUCT = 2001,
  PRODUCT_NOT_FOUND = 2002,
  PRODUCT_ID_IS_EMPTY = 2003,
}

export const ProductErrorMessage = {
  [ProductErrorConstant.INVALID_PRODUCT]: 'Product is invalid',
  [ProductErrorConstant.PRODUCT_NOT_FOUND]: 'Product Not Found',
  [ProductErrorConstant.PRODUCT_ID_IS_EMPTY]: 'Product ID is empty',
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

