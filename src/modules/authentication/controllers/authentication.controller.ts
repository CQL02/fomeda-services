// Authentication controller

import { Body, Controller, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { AdminDto } from '../dtos/admin.dto';
import { SupplierDto } from '../dtos/supplier.dto';
// import { User } from '../domain/schema/user.schema';
// import { Admin } from '../domain/schema/admin.schema';
// import { Supplier } from '../domain/schema/supplier.schema'
import { AuthenticationService } from '../services/implementations/authentication.service';

@Controller('user')
export class AuthenticationController {
  constructor(private readonly userService: AuthenticationService) {}

  @Patch('user_id')
  async updateUserStatus(
    @Param('user_id') user_id: string,
    @Body() userDto: UserDto,
  ) {
    return this.userService.updateUserStatus(user_id, userDto);
  }

  @Post()
  async createSupplier(@Body() supplierDto: SupplierDto) {
    return this.userService.createSupplier(supplierDto);
  }

  @Get()
  async findAllSuppliers(){
    return this.userService.findAllSuppliers();
  }

  @Get('user_id')
  async findSupplierById(@Param('user_id') user_id: string) {
    return this.userService.findSupplierById(user_id);
  }

  @Patch('review/user_id')
  async updateSupplierReviewStatus(
    @Param('user_id') user_id: string,
    @Body() supplierDto: SupplierDto,
  ) {
    return this.userService.updateSupplierReviewStatus(user_id, supplierDto);
  }

  @Post()
  async createAdmin(@Body() adminDto: AdminDto) {
    return this.userService.createAdmin(adminDto);
  }

  @Get()
  async findAllAdmin() {
    return this.userService.findAllAdmins();
  }

  @Get('user_id')
  async findAdminById(@Param('user_id') user_id: string) {
    return this.userService.findAdminById(user_id);
  }
}
