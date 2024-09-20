import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";
import { ProductVerification } from "../schema/product-verification.schema";

@Injectable()
export class ProductVerificationRepository extends AbstractRepository<ProductVerification> {
  constructor(
    @InjectModel(ProductVerification.name)
    private readonly productVerificationModel: Model<ProductVerification>
  ) {
    super(productVerificationModel);
  }

  async getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductVerification[]> {
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
      filters.status = { $in: status};
    }

    if (cat_ids && cat_ids.length > 0) {
      filters.subcat_id = { $in: cat_ids };
    }
    return this.productVerificationModel.find(filters).exec();
  }
}