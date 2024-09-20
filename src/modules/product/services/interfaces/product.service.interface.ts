import { ProductDto } from "../../dtos/product.dto";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";

export interface IProductService {
  createProduct(productDto: ProductDto): Promise<boolean>;
  getProductDetailsById(id: string): Promise<ProductDto>;
  getProductListByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
  updateProductDetailsById(id: string, productDto: ProductDto): Promise<boolean>;
  updateProductIsActive(id: string): Promise<boolean>;
  deleteProductById(id: string): Promise<boolean>;

  createProductVerification(productDto: ProductDto): Promise<boolean>;
  getProductVerificationDetailsById(id: string): Promise<ProductDto>;
  getProductVerificationListByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
  updateProductVerificationDetailsById(id: string, productDto: ProductDto): Promise<boolean>;
  updateProductVerificationReviewById(id: string, productDto: ProductDto): Promise<boolean>;
  deleteProductVerificationDetailsById(id: string): Promise<boolean>;
}