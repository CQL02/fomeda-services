"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductException = exports.ProductErrorMessage = exports.ProductErrorConstant = void 0;
const common_1 = require("@nestjs/common");
var ProductErrorConstant;
(function (ProductErrorConstant) {
    ProductErrorConstant[ProductErrorConstant["INVALID_PRODUCT"] = 2001] = "INVALID_PRODUCT";
    ProductErrorConstant[ProductErrorConstant["PRODUCT_NOT_FOUND"] = 2002] = "PRODUCT_NOT_FOUND";
    ProductErrorConstant[ProductErrorConstant["PRODUCT_ID_IS_EMPTY"] = 2003] = "PRODUCT_ID_IS_EMPTY";
    ProductErrorConstant[ProductErrorConstant["FAILED_TO_ACTIVATE"] = 2004] = "FAILED_TO_ACTIVATE";
})(ProductErrorConstant || (exports.ProductErrorConstant = ProductErrorConstant = {}));
exports.ProductErrorMessage = {
    [ProductErrorConstant.INVALID_PRODUCT]: 'Product is invalid',
    [ProductErrorConstant.PRODUCT_NOT_FOUND]: 'Product Not Found',
    [ProductErrorConstant.PRODUCT_ID_IS_EMPTY]: 'Product ID is empty',
    [ProductErrorConstant.FAILED_TO_ACTIVATE]: 'Product Failed to Activate',
};
class ProductException extends common_1.HttpException {
    constructor(error) {
        const errorMessage = exports.ProductErrorMessage[error];
        super({
            errorCode: error,
            message: errorMessage,
        }, common_1.HttpStatus.BAD_REQUEST);
        this.logger = new common_1.Logger(ProductException.name);
        this.logger.error(`Error ${error}: ${errorMessage}\nStack Trace: ${this.stack}`);
    }
}
exports.ProductException = ProductException;
//# sourceMappingURL=product.exception.js.map