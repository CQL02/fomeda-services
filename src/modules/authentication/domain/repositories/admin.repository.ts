import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { Admin } from '../schema/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
  ) {
    super(adminModel);
  }
  
  // async deactivateAdminById(id: string, is_active: boolean): Promise<Admin> {
  //   return this.adminModel.findByIdAndUpdate(id, {is_active}).exec();
  // }
}
