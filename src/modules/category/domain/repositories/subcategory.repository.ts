import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subcategory } from "../schema/subcategory.schema";

@Injectable()
export class SubcategoryRepository extends AbstractRepository<Subcategory> {
  constructor(
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>
  ) {
    super(subcategoryModel);
  }

  async deactivateSubcategoryById(id: string, is_active: boolean): Promise<Subcategory> {
    return this.subcategoryModel.findByIdAndUpdate(id, { is_active: is_active, last_updated_on: new Date() }).exec();
  }

  async findSubcategoryByCatId(cat_id: string): Promise<Subcategory[]> {
    return this.subcategoryModel.find({ cat_id: cat_id }).exec();
  }

  async deleteSubcategoryByCatId(cat_id: string){
    return this.subcategoryModel.deleteMany({cat_id: cat_id}).exec();
  }
}
