import { ProductDto } from "../../dtos/product.dto";
import { ConsumerProductFilterDto } from "../../dtos/consumer-product-filter.dto";

export interface IConsumerService {
  getConsumerProductByFilter(filter: ConsumerProductFilterDto, skip: number, limit: number): Promise<{products: ProductDto[], total: number}>;
  getConsumerSpecificationFilterBySubcatId(subcat_id: string): Promise<ConsumerProductFilterDto>;
  getConsumerComparedProduct(subcat_id: string, ids: string[]): Promise<ProductDto[]>;
  getProductDetails(id: string): Promise<ProductDto>;
}