import { IProductService } from "../services/interfaces/product.service.interface";
import { ProductDto } from "../dtos/product.dto";
import { ProductListFilterDto } from "../dtos/product-list-filter.dto";
import { ConsumerService } from "../services/implementations/consumer.service";
import { ConsumerProductFilterDto } from "../dtos/consumer-product-filter.dto";
import { Request } from "express";
export declare class ProductController {
    private readonly productService;
    private readonly consumerService;
    constructor(productService: IProductService, consumerService: ConsumerService);
    createProduct(productDto: ProductDto): Promise<boolean>;
    getProductById(id: string): Promise<ProductDto>;
    getProductByFilter(req: Request, productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
    updateProductById(id: string, productDto: ProductDto): Promise<boolean>;
    updateProductIsActive(id: string): Promise<boolean>;
    deleteProductById(id: string): Promise<boolean>;
    createProductVerification(req: Request, productDto: ProductDto): Promise<boolean>;
    getProductVerificationDetailsById(id: string): Promise<ProductDto>;
    getProductVerificationDetailsByFilter(req: Request, productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
    updateProductVerificationDetailsById(req: Request, id: string, productDto: ProductDto): Promise<boolean>;
    updateProductVerificationReviewById(req: Request, id: string, productDto: ProductDto): Promise<boolean>;
    deleteProductVerificationDetailsById(id: string): Promise<boolean>;
    getConsumerProductByFilter(skip: number, limit: number, filter: ConsumerProductFilterDto): Promise<{
        products: ProductDto[];
        total: number;
    }>;
    getConsumerSpecificationFilterBySubcatId(subcat_id: string): Promise<ConsumerProductFilterDto>;
    getConsumerComparedProduct(subcat_id: string, ids: string[]): Promise<ProductDto[]>;
    getProductDetails(id: string): Promise<ProductDto>;
}
