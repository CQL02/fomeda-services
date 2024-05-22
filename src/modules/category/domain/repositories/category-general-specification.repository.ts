import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryGeneralSpecification } from '../schema/category-general-specification.schema';

@Injectable()
export class CategoryGeneralSpecificationRepository extends AbstractRepository<CategoryGeneralSpecification> {
  constructor(
    @InjectModel(CategoryGeneralSpecification.name)
    private readonly categoryGeneralSpecificationModel: Model<CategoryGeneralSpecification>,
  ) {
    super(categoryGeneralSpecificationModel);
  }
}
