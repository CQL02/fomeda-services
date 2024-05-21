import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subcategory } from '../schema/subcategory.schema';

@Injectable()
export class SubcategoryRepository extends AbstractRepository<Subcategory> {
  constructor(
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>,
  ) {
    super(subcategoryModel);
  }
}
