import { HttpException } from "@nestjs/common";
export declare enum ProductErrorConstant {
    INVALID_PRODUCT = 2001,
    PRODUCT_NOT_FOUND = 2002,
    PRODUCT_ID_IS_EMPTY = 2003,
    FAILED_TO_ACTIVATE = 2004
}
export declare const ProductErrorMessage: {
    2001: string;
    2002: string;
    2003: string;
    2004: string;
};
export declare class ProductException extends HttpException {
    private readonly logger;
    constructor(error: ProductErrorConstant);
}
