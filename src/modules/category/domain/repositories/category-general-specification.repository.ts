import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryGeneralSpecification } from "../schema/category-general-specification.schema";

@Injectable()
export class CategoryGeneralSpecificationRepository extends AbstractRepository<CategoryGeneralSpecification> {
  constructor(
    @InjectModel(CategoryGeneralSpecification.name)
    private readonly categoryGeneralSpecificationModel: Model<CategoryGeneralSpecification>
  ) {
    super(categoryGeneralSpecificationModel);
  }

  async deactivateGeneralSpecificationById(id: string, is_active: boolean): Promise<CategoryGeneralSpecification> {
    return this.categoryGeneralSpecificationModel.findByIdAndUpdate(id, {
      is_active: is_active,
      last_updated_on: new Date()
    }).exec();
  }
}
