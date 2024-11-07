import { HttpException } from "@nestjs/common";
export declare enum CategoryErrorConstant {
    EMPTY_CATEGORY = 1001,
    CATEGORY_NOT_FOUND = 1002,
    INVALID_CATEGORY = 1003,
    INVALID_SUBCATEGORY = 1004,
    INVALID_SPECIFICATION = 1005,
    SPECIFICATION_NOT_FOUND = 1006,
    SUBCATEGORY_NOT_FOUND = 1007
}
export declare const CategoryErrorMessage: {
    1001: string;
    1002: string;
    1003: string;
    1004: string;
    1005: string;
    1006: string;
    1007: string;
};
export declare class CategoryException extends HttpException {
    private readonly logger;
    constructor(error: CategoryErrorConstant);
}
