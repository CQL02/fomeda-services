import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { Content } from '../schema/content.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContentRepository extends AbstractRepository<Content> {
  constructor(
    @InjectModel(Content.name)
    private readonly supplierModel: Model<Content>,
  ) {
    super(supplierModel);
  }

}
