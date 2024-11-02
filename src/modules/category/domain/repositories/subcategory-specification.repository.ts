import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubcategorySpecification } from "../schema/subcategory-specification.schema";
import { Request } from "express";
import { SubcategorySpecificationDto } from "../../dtos/subcategory-specification.dto";

@Injectable()
export class SubcategorySpecificationRepository extends AbstractRepository<SubcategorySpecification> {
  constructor(
    @InjectModel(SubcategorySpecification.name)
    private readonly subcategorySpecificationModel: Model<SubcategorySpecification>
  ) {
    super(subcategorySpecificationModel);
  }

  async deactivateSubcategorySpecificationById(req: Request, id: string, is_active: boolean): Promise<SubcategorySpecification> {
    return this.subcategorySpecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async findAllByFilterWithUsername(filter: any): Promise<SubcategorySpecificationDto[]> {
    return this.subcategorySpecificationModel.aggregate([
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
}
