import { RoleDto } from '../dtos/role.dto';
import { IRoleService } from '../services/interfaces/role.service.interface';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: IRoleService);
    getAllRoles(): Promise<RoleDto[]>;
    findAllActiveRoles(): Promise<RoleDto[]>;
    createRole(roleDto: RoleDto): Promise<RoleDto>;
    updateRole(id: string, roleDto: RoleDto): Promise<RoleDto>;
    getModules(id: string): Promise<RoleDto>;
}
