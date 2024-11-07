import { IRoleService } from '../interfaces/role.service.interface';
import { RoleDto } from '../../dtos/role.dto';
import { RoleRepository } from '../../domain/repositories/role.repository';
export declare class RoleService implements IRoleService {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    createRole(roleDto: any): Promise<RoleDto>;
    findAllRoles(): Promise<RoleDto[]>;
    findAllActiveRoles(): Promise<RoleDto[]>;
    updateRole(id: string, roleDto: RoleDto): Promise<RoleDto>;
    getModules(id: string): Promise<RoleDto>;
}
