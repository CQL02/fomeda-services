import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Request, Query,
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { AdminDto } from '../dtos/admin.dto';
import { SupplierDto } from '../dtos/supplier.dto';
import { SessionDto } from '../dtos/session.dto';
import { AuthenticationService } from '../services/implementations/authentication.service';
import { LocalAuthGuard } from '../passport/local-auth.guard';
import { SessionService } from '../services/implementations/session.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: AuthenticationService,
    private readonly sessionService: SessionService,
  ) {
  }

  @Post('register')
  async register(
    @Body() userDto: UserDto,
  ) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
  ) {
    const userId = req?.user?.user_id;
    const sessionId = await this.sessionService.findSessionIdByUserId(userId);
    if (sessionId)
      return {
        sessionId: sessionId,
      };
    return null;
  }

  @Post('logout')
  async logout(
    @Body() sessionDto: SessionDto,
  ) {
    const sessionId = sessionDto?.session_id;
    await this.sessionService.deleteSession(sessionId as string);
    return { message: 'Logout successful' };
  }

  @Get('get-details')
  async getDetails(
    @Query('sessionId') session_id: string,
  ) {
    return this.userService.getUserDetailBySessionId(session_id);
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

  @Get('inactive-suppliers')
  async findAllInactiveSuppliers() {
    return this.userService.findAllInactiveSuppliers();
  }

  @Get('active-suppliers')
  async findAllActiveSuppliers() {
    return this.userService.findAllActiveSuppliers();
  }

  @Get('user_id')
  async findSupplierById(@Param('user_id') user_id: string) {
    return this.userService.findSupplierById(user_id);
  }

  @Patch('review')
  async updateSupplierReviewStatus(
    @Query('userId') user_id: string
  ) {
    return this.userService.updateSupplierReviewStatus(user_id);
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
