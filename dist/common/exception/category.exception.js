"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryException = exports.CategoryErrorMessage = exports.CategoryErrorConstant = void 0;
const common_1 = require("@nestjs/common");
var CategoryErrorConstant;
(function (CategoryErrorConstant) {
    CategoryErrorConstant[CategoryErrorConstant["EMPTY_CATEGORY"] = 1001] = "EMPTY_CATEGORY";
    CategoryErrorConstant[CategoryErrorConstant["CATEGORY_NOT_FOUND"] = 1002] = "CATEGORY_NOT_FOUND";
    CategoryErrorConstant[CategoryErrorConstant["INVALID_CATEGORY"] = 1003] = "INVALID_CATEGORY";
    CategoryErrorConstant[CategoryErrorConstant["INVALID_SUBCATEGORY"] = 1004] = "INVALID_SUBCATEGORY";
    CategoryErrorConstant[CategoryErrorConstant["INVALID_SPECIFICATION"] = 1005] = "INVALID_SPECIFICATION";
    CategoryErrorConstant[CategoryErrorConstant["SPECIFICATION_NOT_FOUND"] = 1006] = "SPECIFICATION_NOT_FOUND";
    CategoryErrorConstant[CategoryErrorConstant["SUBCATEGORY_NOT_FOUND"] = 1007] = "SUBCATEGORY_NOT_FOUND";
})(CategoryErrorConstant || (exports.CategoryErrorConstant = CategoryErrorConstant = {}));
exports.CategoryErrorMessage = {
    [CategoryErrorConstant.EMPTY_CATEGORY]: 'Category Field is empty',
    [CategoryErrorConstant.CATEGORY_NOT_FOUND]: 'Category Not Found',
    [CategoryErrorConstant.INVALID_CATEGORY]: 'Invalid Category',
    [CategoryErrorConstant.INVALID_SUBCATEGORY]: 'Invalid Subcategory',
    [CategoryErrorConstant.INVALID_SPECIFICATION]: 'Invalid Specification',
    [CategoryErrorConstant.SPECIFICATION_NOT_FOUND]: 'Specification Not Found',
    [CategoryErrorConstant.SUBCATEGORY_NOT_FOUND]: 'Subcategory Not Found',
};
class CategoryException extends common_1.HttpException {
    constructor(error) {
        const errorMessage = exports.CategoryErrorMessage[error];
        super({
            errorCode: error,
            message: errorMessage,
        }, common_1.HttpStatus.BAD_REQUEST);
        this.logger = new common_1.Logger(CategoryException.name);
        this.logger.error(`Error ${error}: ${errorMessage}\nStack Trace: ${this.stack}`);
    }
}
exports.CategoryException = CategoryException;
//# sourceMappingURL=category.exception.js.map