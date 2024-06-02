import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryBaseSubspecification } from "../schema/category-base-subspecification.schema";

@Injectable()
export class CategoryBaseSubspecificationRepository extends AbstractRepository<CategoryBaseSubspecification> {
  constructor(
    @InjectModel(CategoryBaseSubspecification.name)
    private readonly categoryBaseSubspecificationModel: Model<CategoryBaseSubspecification>
  ) {
    super(categoryBaseSubspecificationModel);
  }

  async deactivateCategoryBaseSubspecificationById(id: string, is_active: boolean): Promise<CategoryBaseSubspecification> {
    return this.categoryBaseSubspecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date()
    }).exec();
  }
}
