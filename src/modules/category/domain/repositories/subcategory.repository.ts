import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subcategory } from "../schema/subcategory.schema";
import { Request } from "express";
import { SubcategoryDto } from "../../dtos/subcategory.dto";

@Injectable()
export class SubcategoryRepository extends AbstractRepository<Subcategory> {
  constructor(
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>
  ) {
    super(subcategoryModel);
  }

  async deactivateSubcategoryById(req: Request, id: string, is_active: boolean): Promise<Subcategory> {
    return this.subcategoryModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async findSubcategoryByCatId(cat_id: string): Promise<Subcategory[]> {
    return this.subcategoryModel.find({ cat_id: cat_id }).exec();
  }

  async deleteSubcategoryByCatId(cat_id: string) {
    return this.subcategoryModel.deleteMany({ cat_id: cat_id }).exec();
  }

  async getAllSubcategoryWithUsername(): Promise<SubcategoryDto[]> {
    return this.subcategoryModel.aggregate([
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
