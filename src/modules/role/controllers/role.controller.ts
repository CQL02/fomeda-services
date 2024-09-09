import {
  Body,
  Controller,
  Post,
  Inject, Get, Patch, Query,
} from '@nestjs/common';
import { RoleDto } from '../dtos/role.dto';
import { IRoleService } from '../services/interfaces/role.service.interface';
import { RoleService } from '../services/implementations/role.service';

@Controller('role')
export class RoleController {
  constructor(@Inject(RoleService.name) private readonly roleService: IRoleService,
  ) {
  }

  @Get("get-roles")
  async getAllRoles(
  ) {
    return this.roleService.findAllRoles();
  }

  @Get("get-active-roles")
  async findAllActiveRoles(
  ) {
    return this.roleService.findAllActiveRoles();
  }

  @Post('create-role')
  async createRole(
    @Body() roleDto: RoleDto,
  ) {
    return this.roleService.createRole(roleDto);
  }

  @Patch('update-role')
  async updateRole(
    @Query("id") id: string,
    @Body() roleDto: RoleDto,
  ) {
    return this.roleService.updateRole(id, roleDto);
  }

  // @Get("get-modules")
  // async getModules(
  // ) {
  //   return this.roleService.createRole();
  // }
}
