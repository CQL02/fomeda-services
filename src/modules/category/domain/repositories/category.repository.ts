import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { Category } from "../schema/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>
  ) {
    super(categoryModel);
  }

  async deactivateCategoryById(id: string, is_active: boolean): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, { is_active: is_active, last_updated_on: new Date() }).exec();
  }
}
