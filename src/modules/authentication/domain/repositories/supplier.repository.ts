import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { Supplier } from '../schema/supplier.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SupplierRepository extends AbstractRepository<Supplier> {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<Supplier>,
  ) {
    super(supplierModel);
  }

}
