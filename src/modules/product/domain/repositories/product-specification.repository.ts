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

  async updateProductSpecificationsScore(productId: string, specification: any[]): Promise<boolean> {
    console.log("run here")
    try {
      const operations = specification.flatMap(spec => {
        const { spec_id, score, subspecification } = spec;

        if (subspecification) {
          return subspecification.map(subspec => {
            const { subspec_id, score } = subspec;

            return {
              updateOne: {
                filter: { pro_id: productId, spec_id, 'subspecification.subspec_id': subspec_id },
                update: { $set: { 'subspecification.$.score': score } },
                upsert: false,
              }
            };
          }).concat({
            updateOne: {
              filter: { pro_id: productId, spec_id, 'subspecification.subspec_id': { $exists: false } },
              update: { $push: { subspecification: { $each: subspecification } } },
              upsert: false,
            }
          });
        }

        return {
          updateOne: {
            filter: { pro_id: productId, spec_id },
            update: { $set: { score } },
            upsert: false,
          }
        };
      });

      const result = await this.productSpecificationModel.bulkWrite(operations);
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