import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryGeneralSubspecification } from "../schema/category-general-subspecification.schema";

@Injectable()
export class CategoryGeneralSubspecificationRepository extends AbstractRepository<CategoryGeneralSubspecification> {
  constructor(
    @InjectModel(CategoryGeneralSubspecification.name)
    private readonly categoryGeneralSubspecificationModel: Model<CategoryGeneralSubspecification>
  ) {
    super(categoryGeneralSubspecificationModel);
  }

  async deactivateGeneralSubspecificationById(id: string, is_active: boolean): Promise<CategoryGeneralSubspecification> {
    return this.categoryGeneralSubspecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date()
    }).exec();
  }

  async deleteGeneralSubspecificationBySpecId(subcat_spec_id: string) {
    return this.categoryGeneralSubspecificationModel.deleteMany({subcat_spec_id: subcat_spec_id}).exec();
  }
}
