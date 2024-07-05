import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export enum CategoryErrorConstant {
  EMPTY_CATEGORY = 1001,
  CATEGORY_NOT_FOUND = 1002,
  INVALID_CATEGORY = 1003,
  INVALID_SUBCATEGORY = 1004,
  INVALID_SPECIFICATION = 1005,
  SPECIFICATION_NOT_FOUND = 1006,
  SUBCATEGORY_NOT_FOUND = 1007,
}

export const CategoryErrorMessage = {
  [CategoryErrorConstant.EMPTY_CATEGORY]: 'Category Field is empty',
  [CategoryErrorConstant.CATEGORY_NOT_FOUND]: 'Category Not Found',
  [CategoryErrorConstant.INVALID_CATEGORY]: 'Invalid Category',
  [CategoryErrorConstant.INVALID_SUBCATEGORY]: 'Invalid Subcategory',
  [CategoryErrorConstant.INVALID_SPECIFICATION]: 'Invalid Specification',
  [CategoryErrorConstant.SPECIFICATION_NOT_FOUND]: 'Specification Not Found',
  [CategoryErrorConstant.SUBCATEGORY_NOT_FOUND]: 'Subcategory Not Found',
}

export class CategoryException extends HttpException {
  private readonly logger = new Logger(CategoryException.name);

  constructor(error: CategoryErrorConstant) {
    const errorMessage = CategoryErrorMessage[error]
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

