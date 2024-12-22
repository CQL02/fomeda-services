import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../../common/database/abstracts/repository.abstract';
import { Role } from '../schema/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {
    super(roleModel);
  }
}
