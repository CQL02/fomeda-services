import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubcategorySubspecification } from "../schema/subcategory-subspecification.schema";
import { Request } from "express";
import { SubcategorySubspecificationDto } from "../../dtos/subcategory-subspecification.dto";

@Injectable()
export class SubcategorySubspecificationRepository extends AbstractRepository<SubcategorySubspecification> {
  constructor(
    @InjectModel(SubcategorySubspecification.name)
    private readonly subcategorySubspecificationModel: Model<SubcategorySubspecification>
  ) {
    super(subcategorySubspecificationModel);
  }

  async deactivateSubcategorySubspecificationById(req: Request, id: string, is_active: boolean): Promise<SubcategorySubspecification> {
    return this.subcategorySubspecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async deleteSubcategorySubspecificationBySpecId(subcat_spec_id: string) {
    return this.subcategorySubspecificationModel.deleteMany({ subcat_spec_id: subcat_spec_id }).exec();
  }

  async findAllByFilterWithUsername(filter: any): Promise<SubcategorySubspecificationDto[]> {
    return this.subcategorySubspecificationModel.aggregate([
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

  async findBySubspecificationName(specId: string, subspecName: string): Promise<SubcategorySubspecificationDto> {
    const results = await this.subcategorySubspecificationModel.aggregate([
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
      },
      {
        $unionWith: {
          coll: "category_base_subspecification",
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
