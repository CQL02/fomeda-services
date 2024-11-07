import { IConsumerService } from "../interfaces/consumer.service.interface";
import { ProductDto } from "../../dtos/product.dto";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductSpecificationRepository } from "../../domain/repositories/product-specification.repository";
import { ICategoryService } from "../../../category/services/interfaces/category.service.interface";
import { ISubcategorySpecificationService } from "../../../category/services/interfaces/subcategory-specification.service.interface";
import { IProductService } from "../interfaces/product.service.interface";
import { ConsumerProductFilterDto } from "../../dtos/consumer-product-filter.dto";
import { ProductMapper } from "../mapper/product.mapper";
export declare class ConsumerService implements IConsumerService {
    private readonly productRepository;
    private readonly productSpecificationRepository;
    private readonly productMapper;
    private readonly productService;
    private readonly categoryService;
    private readonly subcategorySpecificationService;
    constructor(productRepository: ProductRepository, productSpecificationRepository: ProductSpecificationRepository, productMapper: ProductMapper, productService: IProductService, categoryService: ICategoryService, subcategorySpecificationService: ISubcategorySpecificationService);
    getConsumerComparedProduct(subcat_id: string, ids: string[]): Promise<ProductDto[]>;
    getConsumerProductByFilter(filter: ConsumerProductFilterDto, skip: number, limit: number): Promise<{
        products: ProductDto[];
        total: number;
    }>;
    getConsumerSpecificationFilterBySubcatId(subcat_id: string): Promise<ConsumerProductFilterDto>;
    private getSpecMaps;
    getProductDetails(id: string): Promise<ProductDto>;
}
