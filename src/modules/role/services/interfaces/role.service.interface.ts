import { RoleDto } from '../../dtos/role.dto';

export interface IRoleService {
  createRole(roleDto: RoleDto): Promise<RoleDto>;
  findAllRoles(): Promise<RoleDto[]>;
  findAllActiveRoles(): Promise<RoleDto[]>
  updateRole(user_id: string, roleDto: RoleDto): Promise<RoleDto>;
}
