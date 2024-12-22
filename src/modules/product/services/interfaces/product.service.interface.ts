import { ProductDto } from "../../dtos/product.dto";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";
import { Request } from "express";

export interface IProductService {
  createProduct(productDto: ProductDto): Promise<boolean>;
  getProductDetailsById(id: string): Promise<ProductDto>;
  getProductListByFilter(req: Request, productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
  updateProductDetailsById(id: string, productDto: ProductDto): Promise<boolean>;
  updateProductIsActive(id: string): Promise<boolean>;
  deleteProductById(id: string): Promise<boolean>;

  createProductVerification(req: Request, productDto: ProductDto): Promise<boolean>;
  getProductVerificationDetailsById(id: string): Promise<ProductDto>;
  getProductVerificationListByFilter(req: Request, productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
  updateProductVerificationDetailsById(req: Request, id: string, productDto: ProductDto): Promise<boolean>;
  updateProductVerificationReviewById(req: Request, id: string, productDto: ProductDto): Promise<boolean>;
  deleteProductVerificationDetailsById(id: string): Promise<boolean>;
}