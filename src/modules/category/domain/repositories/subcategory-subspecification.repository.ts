import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubcategorySubspecification } from '../schema/subcategory-subspecification.schema';

@Injectable()
export class SubcategorySubspecificationRepository extends AbstractRepository<SubcategorySubspecification> {
  constructor(
    @InjectModel(SubcategorySubspecification.name)
    private readonly subcategorySubspecificationModel: Model<SubcategorySubspecification>,
  ) {
    super(subcategorySubspecificationModel);
  }

  async deactivateSubcategorySubspecificationById(id: string, is_active: boolean): Promise<SubcategorySubspecification> {
    return this.subcategorySubspecificationModel.findByIdAndUpdate(id, {is_active}).exec();
  }
}
