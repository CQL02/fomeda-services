// Authentication controller

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { AdminDto } from '../dtos/admin.dto';
import { SupplierDto } from '../dtos/supplier.dto';
// import { User } from '../domain/schema/user.schema';
// import { Admin } from '../domain/schema/admin.schema';
// import { Supplier } from '../domain/schema/supplier.schema'
import { AuthenticationService } from '../services/implementations/authentication.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express'
import { LocalAuthGuard } from '../passport/local-auth.guard';
import { AuthenticationGuard } from '../passport/authentication.guard';


@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: AuthenticationService,
  ) {
  }

  @Post('register')
  async register(
    @Body() userDto: UserDto,
  ) {
    const hashedPassword = await bcrypt.hash(userDto?.password, 14);

    const response = await this.userService.createUser({ ...userDto, password: hashedPassword });

    if (!response) {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (response?.type === 'supplier') {
        const supplierDto = {
          user_id: response?.user_id,
          company_name: userDto.company_name,
          company_no: userDto.company_no,
          company_address: userDto.company_address,
        }
        return this.userService.createSupplier(supplierDto)
    } else if (response?.type === 'admin') {
        const adminDto = {
          user_id: response?.user_id,
        }
      return this.userService.createAdmin(adminDto)
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req
  ) {
    return req.user;
  }

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

  @UseGuards(AuthenticationGuard)
  @Get("suppliers")
  async findAllSuppliers(
  ) {
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
