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
}
