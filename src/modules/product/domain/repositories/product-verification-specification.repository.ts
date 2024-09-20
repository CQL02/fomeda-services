import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductSpecificationDto } from "../../dtos/product-specification.dto";
import { ProductVerificationSpecification } from "../schema/product-verification-specification.schema";

@Injectable()
export class ProductVerificationSpecificationRepository extends AbstractRepository<ProductVerificationSpecification> {
  constructor(
    @InjectModel(ProductVerificationSpecification.name)
    private readonly productVerificationSpecificationModel: Model<ProductVerificationSpecification>
  ) {
    super(productVerificationSpecificationModel);
  }

  async createList(productSpecificationDto: ProductSpecificationDto[]): Promise<ProductSpecificationDto[]> {
    return await this.productVerificationSpecificationModel.insertMany(productSpecificationDto);
  }

  async updateProductSpecifications(verificationId: string, specification: any[]) {
    try {
      const operations = specification.map(spec => {
        const { spec_id, spec_desc, subspecification } = spec;

        const subspecUpdates = subspecification ? subspecification.map(subspec => {
          return {
            updateOne: {
              filter: { verification_id: verificationId, spec_id: spec_id, 'subspecification.subspec_id': subspec.subspec_id },
              update: { $set: { 'subspecification.$.subspec_desc': subspec.subspec_desc } }, // Update only spec_desc of the matching subspec_id
              upsert: false
            }
          };
        }) : [];

        const mainSpecUpdate = {
          updateOne: {
            filter: { verification_id: verificationId, spec_id: spec_id },
            update: { $set: { spec_desc } },
            upsert: true,
          }
        };

        return [mainSpecUpdate, ...subspecUpdates];
      });

      const flattenedOperations = operations.flat();
      const result = await this.productVerificationSpecificationModel.bulkWrite(flattenedOperations);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateProductSpecificationsScore(verificationId: string, specification: any[]): Promise<boolean> {
    try {
      const operations = specification.flatMap(spec => {
        const { spec_id, score: specScore, subspecification } = spec;

        if (subspecification && subspecification.length > 0) {
          const subspecOperations = subspecification.map((subspec: any) => {
            const { subspec_id, score: subspecScore } = subspec;

            return {
              updateOne: {
                filter: { verification_id: verificationId, spec_id, 'subspecification.subspec_id': subspec_id },
                update: { $set: { 'subspecification.$.score': subspecScore } },
                upsert: false,
              }
            };
          });

          const pushSubspecification = {
            updateOne: {
              filter: { verification_id: verificationId, spec_id, 'subspecification.subspec_id': { $exists: false } },
              update: { $push: { subspecification: { $each: subspecification } } },
              upsert: false,
            }
          };

          return [...subspecOperations, pushSubspecification];
        }

        return {
          updateOne: {
            filter: { verification_id: verificationId, spec_id },
            update: { $set: { score: specScore } },
            upsert: false,
          }
        };
      });

      const result = await this.productVerificationSpecificationModel.bulkWrite(operations);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteProductSpecificationByVerificationId(verificationId: string) {
    return this.productVerificationSpecificationModel.deleteMany({verification_id: verificationId}).exec();
  }
}