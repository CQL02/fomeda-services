import { ProductDto } from "../../dtos/product.dto";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";

export interface IProductService {
  createProduct(productDto: ProductDto): Promise<boolean>;
  getProductById(id: string): Promise<ProductDto>;
  getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductDto[]>;
  updateProductById(id: string, productDto: ProductDto): Promise<boolean>;
  updateProductIsActive(id: string): Promise<boolean>;
  deleteProductById(id: string): Promise<boolean>;
}