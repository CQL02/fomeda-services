import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryGeneralSpecification } from "../schema/category-general-specification.schema";
import { Request } from "express";
import { GeneralSpecificationDto } from "../../dtos/general-specification.dto";

@Injectable()
export class CategoryGeneralSpecificationRepository extends AbstractRepository<CategoryGeneralSpecification> {
  constructor(
    @InjectModel(CategoryGeneralSpecification.name)
    private readonly categoryGeneralSpecificationModel: Model<CategoryGeneralSpecification>
  ) {
    super(categoryGeneralSpecificationModel);
  }

  async deactivateGeneralSpecificationById(req: Request ,id: string, is_active: boolean): Promise<CategoryGeneralSpecification> {
    return this.categoryGeneralSpecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async findAllWithUsername(): Promise<GeneralSpecificationDto[]> {
    return this.categoryGeneralSpecificationModel.aggregate([
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
}
