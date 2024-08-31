import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { Product } from "../schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) {
    super(productModel);
  }

  async getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<Product[]> {
    const { owner_id, status, cat_ids } = productListFilterDto;

    const filters: any = {
      owner_id: owner_id,
      is_active: true,
    };

    if (status) {
      filters.status = status;
    }

    if (cat_ids && cat_ids.length > 0) {
      filters.cat_ids = { $in: cat_ids };
    }

    return this.productModel.find(filters).exec();
  }

}