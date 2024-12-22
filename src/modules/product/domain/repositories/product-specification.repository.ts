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
        const { spec_id, spec_desc, subspecification } = spec;

        const subspecUpdates = subspecification ? subspecification.map(subspec => {
          return {
            updateOne: {
              filter: { pro_id: productId, spec_id: spec_id, 'subspecification.subspec_id': subspec.subspec_id },
              update: { $set: { 'subspecification.$.subspec_desc': subspec.subspec_desc } },
              upsert: false
            }
          };
        }) : [];

        const mainSpecUpdate = {
          updateOne: {
            filter: { pro_id: productId, spec_id: spec_id },
            update: { $set: { spec_desc } },
            upsert: true,
          }
        };

        return [mainSpecUpdate, ...subspecUpdates];
      });

      const flattenedOperations = operations.flat();
      const result = await this.productSpecificationModel.bulkWrite(flattenedOperations);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteProductSpecificationByProId(pro_id: string) {
    return this.productSpecificationModel.deleteMany({pro_id: pro_id}).exec();
  }
}