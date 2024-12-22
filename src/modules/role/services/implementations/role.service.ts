import { Injectable } from '@nestjs/common';
import { IRoleService } from '../interfaces/role.service.interface';
import { RoleDto } from '../../dtos/role.dto';
import { RoleRepository } from '../../domain/repositories/role.repository';

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
  ) {
  }

  async createRole(roleDto): Promise<RoleDto> {
    return this.roleRepository.create(roleDto);
  }

  async findAllRoles(): Promise<RoleDto[]> {
    const pipeline = [
      {
        $lookup: {
          from: 'user',
          localField: 'created_by',
          foreignField: 'user_id',
          as: 'creator',
        },
      },
      {
        $unwind: {
          path: '$creator',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'last_updated_by',
          foreignField: 'user_id',
          as: 'updater',
        },
      },
      {
        $unwind: {
          path: '$updater',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          created_by: { $ifNull: ['$creator.username', '$created_by'] },
          last_updated_by: { $ifNull: ['$updater.username', '$last_updated_by'] },
        },
      },
      { $unset: ['creator', 'updater'] }
    ];
    return await this.roleRepository.aggregate(pipeline);
  }

  async findAllActiveRoles(): Promise<RoleDto[]> {
    const pipeline = [
      { $match: { is_active: true } },
      {
        $lookup: {
          from: 'user',
          localField: 'created_by',
          foreignField: 'user_id',
          as: 'creator',
        },
      },
      {
        $unwind: {
          path: '$creator',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'last_updated_by',
          foreignField: 'user_id',
          as: 'updater',
        },
      },
      {
        $unwind: {
          path: '$updater',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          created_by: { $ifNull: ['$creator.username', '$created_by'] },
          last_updated_by: { $ifNull: ['$updater.username', '$last_updated_by'] },
        },
      },
      { $unset: ['creator', 'updater'] }
    ];
    return this.roleRepository.aggregate(pipeline);
  }

  async updateRole(id: string, roleDto: RoleDto): Promise<RoleDto> {
    return this.roleRepository.update(id, { ...roleDto, last_updated_on: new Date()});
  }

  async getModules(id: string): Promise<RoleDto> {
    return this.roleRepository.findOneByFilter({_id: id},{_id: 0});
  }
}
