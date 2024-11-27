import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryBaseSpecification } from "../schema/category-base-specification.schema";
import { Request } from "express";
import { BaseSpecificationDto } from "../../dtos/base-specification.dto";

@Injectable()
export class CategoryBaseSpecificationRepository extends AbstractRepository<CategoryBaseSpecification> {
  constructor(
    @InjectModel(CategoryBaseSpecification.name)
    private readonly categoryBaseSpecificationModel: Model<CategoryBaseSpecification>
  ) {
    super(categoryBaseSpecificationModel);
  }

  async deactivateCategoryBaseSpecificationById(req: Request, id: string, is_active: boolean): Promise<CategoryBaseSpecification> {
    return this.categoryBaseSpecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async findAllByFilterWithUsername(filter: any): Promise<BaseSpecificationDto[]> {
    return this.categoryBaseSpecificationModel.aggregate([
      { $match: filter},
      {
        $lookup: {
          from: "user",
          localField: "created_by",
          foreignField: "user_id",
          as: "created_user"
        }
      },
      {
        $lookup: {
          from: "user",
          localField: "last_updated_by",
          foreignField: "user_id",
          as: "last_updated_user"
        }
      },
      {
        $addFields: {
          created_name: { $arrayElemAt: ["$created_user.username", 0] },
          last_updated_name: { $arrayElemAt: ["$last_updated_user.username", 0] }
        }
      },
      {
        $project: {
          created_user: 0,
          last_updated_user: 0
        }
      }
    ]);
  }

  async findBySpecificationName(specName: string, catType: string, catId: string): Promise<BaseSpecificationDto> {
    const results = await this.categoryBaseSpecificationModel.aggregate([
      {
        $match: {
          $and: [
            { cat_type: catType },
            { cat_id: catId },
            {
              $expr: {
                $eq: [
                  { $toLower: "$subcat_spec_name" },
                  specName.toLowerCase()
                ]
              }
            }
          ]
        }
      },
      {
        $unionWith: {
          coll: "category_general_specification",
          pipeline: [
            {
              $match: {
                $and: [
                  { cat_type: catType },
                  {
                    $expr: {
                      $eq: [
                        { $toLower: "$subcat_spec_name" },
                        specName.toLowerCase()
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]);

    return results.length > 0 ? results[0] : null;
  }
}
