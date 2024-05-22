import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubcategorySpecification } from '../schema/subcategory-specification.schema';

@Injectable()
export class SubcategorySpecificationRepository extends AbstractRepository<SubcategorySpecification> {
  constructor(
    @InjectModel(SubcategorySpecification.name)
    private readonly subcategorySpecificationModel: Model<SubcategorySpecification>,
  ) {
    super(subcategorySpecificationModel);
  }
}
