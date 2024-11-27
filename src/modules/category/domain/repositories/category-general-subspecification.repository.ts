import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryGeneralSubspecification } from "../schema/category-general-subspecification.schema";
import { Request } from "express";
import { GeneralSubspecificationDto } from "../../dtos/general-subspecification.dto";

@Injectable()
export class CategoryGeneralSubspecificationRepository extends AbstractRepository<CategoryGeneralSubspecification> {
  constructor(
    @InjectModel(CategoryGeneralSubspecification.name)
    private readonly categoryGeneralSubspecificationModel: Model<CategoryGeneralSubspecification>
  ) {
    super(categoryGeneralSubspecificationModel);
  }

  async deactivateGeneralSubspecificationById(req: Request, id: string, is_active: boolean): Promise<CategoryGeneralSubspecification> {
    return this.categoryGeneralSubspecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async deleteGeneralSubspecificationBySpecId(subcat_spec_id: string) {
    return this.categoryGeneralSubspecificationModel.deleteMany({subcat_spec_id: subcat_spec_id}).exec();
  }

  async findAllWithUsername(): Promise<GeneralSubspecificationDto[]> {
    return this.categoryGeneralSubspecificationModel.aggregate([
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

  async findBySubspecificationName(specId: string, subpecName: string): Promise<GeneralSubspecificationDto> {
    return this.categoryGeneralSubspecificationModel.findOne({
      $and: [
        { subcat_spec_id: specId },
        {
          $expr: {
            $eq: [
              { $toLower: "$subcat_subspec_name" },
              subpecName.toLowerCase()
            ]
          }
        }
      ]
    })
  }
}
