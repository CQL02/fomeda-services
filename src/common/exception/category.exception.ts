import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export enum CategoryErrorConstant {
  EMPTY_CATEGORY = 1001,
  CATEGORY_NOT_FOUND = 1002,
  INVALID_CATEGORY = 1003,
  INVALID_SUBCATEGORY = 1004,
  INVALID_SPECIFICATION = 1005,
  SPECIFICATION_NOT_FOUND = 1006,
  SUBCATEGORY_NOT_FOUND = 1007,
  DUPLICATE_CATEGORY = 1008,
  DUPLICATE_SUBCATEGORY = 1009,
  DUPLICATE_SPECIFICATION = 1010,
  DUPLICATE_SUBSPECIFICATION = 1011,
}

export const CategoryErrorMessage = {
  [CategoryErrorConstant.EMPTY_CATEGORY]: 'Category Field is empty',
  [CategoryErrorConstant.CATEGORY_NOT_FOUND]: 'Category Not Found',
  [CategoryErrorConstant.INVALID_CATEGORY]: 'Invalid Category',
  [CategoryErrorConstant.INVALID_SUBCATEGORY]: 'Invalid Subcategory',
  [CategoryErrorConstant.INVALID_SPECIFICATION]: 'Invalid Specification',
  [CategoryErrorConstant.SPECIFICATION_NOT_FOUND]: 'Specification Not Found',
  [CategoryErrorConstant.SUBCATEGORY_NOT_FOUND]: 'Subcategory Not Found',
  [CategoryErrorConstant.DUPLICATE_CATEGORY]: 'Category Existed',
  [CategoryErrorConstant.DUPLICATE_SUBCATEGORY]: 'Subcategory Existed',
  [CategoryErrorConstant.DUPLICATE_SPECIFICATION]: 'Specification Existed',
  [CategoryErrorConstant.DUPLICATE_SUBSPECIFICATION]: 'Subspecification Existed',
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

