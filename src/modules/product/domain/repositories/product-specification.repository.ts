import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductSpecification } from "../schema/product-specification.schema";
import { ProductSpecificationDto } from "../../dtos/product-specification.dto";

@Injectable()
export class ProductSpecificationRepository extends AbstractRepository<ProductSpecification> {
  constructor(
    @InjectModel(ProductSpecification.name)
    private readonly productSpecificationModel: Model<ProductSpecification>
  ) {
    super(productSpecificationModel);
  }

  async createList(productSpecificationDto: ProductSpecificationDto[]): Promise<ProductSpecificationDto[]> {
    return await this.productSpecificationModel.insertMany(productSpecificationDto);
  }

  async updateProductSpecifications(productId: string, specification: any[]) {
    try {
      const operations = specification.map(spec => {
        const {spec_id, spec_desc, subspecification } = spec;
        return {
          updateOne: {
            filter: {pro_id: productId, spec_id: spec_id},
            update: {$set: {spec_desc, subspecification}},
            upsert: true,
          }
        }
      })

      const result = await this.productSpecificationModel.bulkWrite(operations);
      return result.modifiedCount > 0;
    } catch (error) {
      return false;
    }
  }

}