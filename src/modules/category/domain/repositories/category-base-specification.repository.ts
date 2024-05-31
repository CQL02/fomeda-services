import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryBaseSpecification } from '../schema/category-base-specification.schema';

@Injectable()
export class CategoryBaseSpecificationRepository extends AbstractRepository<CategoryBaseSpecification> {
  constructor(
    @InjectModel(CategoryBaseSpecification.name)
    private readonly categoryBaseSpecificationModel: Model<CategoryBaseSpecification>,
  ) {
    super(categoryBaseSpecificationModel);
  }

  async deactivateCategoryBaseSpecificationById(id: string, is_active: boolean): Promise<CategoryBaseSpecification> {
    return this.categoryBaseSpecificationModel.findByIdAndUpdate(id, {is_active}).exec();
  }
}
