import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryType } from '../schema/category-type.schema';

@Injectable()
export class CategoryTypeRepository extends AbstractRepository<CategoryType> {
  constructor(
    @InjectModel(CategoryType.name)
    private readonly categoryTypeModel: Model<CategoryType>,
  ) {
    super(categoryTypeModel);
  }
}
