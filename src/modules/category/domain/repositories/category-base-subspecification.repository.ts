import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryBaseSubspecification } from "../schema/category-base-subspecification.schema";
import { Request } from "express";
import { BaseSubspecificationDto } from "../../dtos/base-subspecification.dto";

@Injectable()
export class CategoryBaseSubspecificationRepository extends AbstractRepository<CategoryBaseSubspecification> {
  constructor(
    @InjectModel(CategoryBaseSubspecification.name)
    private readonly categoryBaseSubspecificationModel: Model<CategoryBaseSubspecification>
  ) {
    super(categoryBaseSubspecificationModel);
  }

  async deactivateCategoryBaseSubspecificationById(req: Request, id: string, is_active: boolean): Promise<CategoryBaseSubspecification> {
    return this.categoryBaseSubspecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async deleteCategoryBaseSubspecificationBySpecId(subcat_spec_id: string) {
    return this.categoryBaseSubspecificationModel.deleteMany({subcat_spec_id: subcat_spec_id}).exec();
  }

  async findAllByFilterWithUsername(filter: any): Promise<BaseSubspecificationDto[]> {
    return this.categoryBaseSubspecificationModel.aggregate([
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

  async findBySubspecificationName(specId: string, subspecName: string): Promise<BaseSubspecificationDto> {
    const results = await this.categoryBaseSubspecificationModel.aggregate([
      {
        $match: {
          $and: [
            { subcat_spec_id: specId },
            {
              $expr: {
                $eq: [
                  { $toLower: "$subcat_subspec_name" },
                  subspecName.toLowerCase()
                ]
              }
            }
          ]
        }
      },
      {
        $unionWith: {
          coll: "category_general_subspecification",
          pipeline: [
            {
              $match: {
                $and: [
                  { subcat_spec_id: specId },
                  {
                    $expr: {
                      $eq: [
                        { $toLower: "$subcat_subspec_name" },
                        subspecName.toLowerCase()
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
