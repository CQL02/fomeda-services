import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { Category } from "../schema/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Request } from "express";
import { CategoryDto } from "../../dtos/category.dto";

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ) {
    super(categoryModel);
  }

  async deactivateCategoryById(req: Request, id: string, is_active: boolean): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date(),
      last_updated_by: req.user,
    }).exec();
  }

  async getAllCategoryWithUsername(): Promise<CategoryDto[]> {
    return this.categoryModel.aggregate([
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

  async findByCategoryName(catName: string): Promise<CategoryDto> {
    return this.categoryModel.findOne({
      $expr: {
        $eq: [
          { $toLower: "$cat_name" },
          catName.toLowerCase()
        ]
      }
    })
  }
}
