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
    return this.roleRepository.findAll();
  }

  async findAllActiveRoles(): Promise<RoleDto[]> {
    return this.roleRepository.findAllByFilter({is_active: true});
  }

  async updateRole(id: string, roleDto: RoleDto): Promise<RoleDto> {
    return this.roleRepository.update(id, { ...roleDto, last_updated_on: new Date()});
  }
}
