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
    const { owner_id, status, cat_ids, search } = productListFilterDto;

    const filters: any = {};

    if (owner_id) {
      filters.owner_id = owner_id;
    }

    if (search) {
      filters.$or = [
        { product_name: { $regex: search, $options: 'i' } },
        { model_no: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filters.status = status;
    }

    if (cat_ids && cat_ids.length > 0) {
      filters.subcat_id = { $in: cat_ids };
    }
    return this.productModel.find(filters).exec();
  }
}