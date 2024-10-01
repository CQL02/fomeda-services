import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Request, Query, Inject,
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { SupplierDto } from '../dtos/supplier.dto';
import { SessionDto } from '../dtos/session.dto';
import { AuthenticationService } from '../services/implementations/authentication.service';
import { LocalAuthGuard } from '../passport/local-auth.guard';
import { SessionService } from '../services/implementations/session.service';
import { IAuthenticationService } from '../services/interfaces/authentication.service.interface';
import { ISessionService } from '../services/interfaces/session.service.interface';
import { AdminDto } from '../dtos/admin.dto';

@Controller('auth')
export class AuthenticationController {

  constructor(@Inject(AuthenticationService.name) private readonly authenticationService: IAuthenticationService,
              @Inject(SessionService.name) private readonly sessionService: ISessionService,
  ) {
  }

  @Post('register')
  async register(
    @Body() userDto: UserDto,
  ) {
    return this.authenticationService.createUser(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
  ) {
    return this.authenticationService.login(req);
  }

  @Post('logout')
  async logout(
    @Body() sessionDto: SessionDto,
  ) {
    return this.authenticationService.logout(sessionDto?.session_id)
  }

  @Get('check-email')
  async checkEmailDuplicate(
    @Query('email') email: string,
  ) {
    return this.authenticationService.checkEmailDuplicate(email);
  }

  @Get('check-username')
  async checkUsernameDuplicate(
    @Query('username') username: string,
  ) {
    return this.authenticationService.checkUsernameDuplicate(username);
  }

  @Get('check-status')
  async checkSupplierStatus(
    @Query('username') username: string,
  ) {
    return this.authenticationService.checkSupplierStatus(username);
  }

  @Get('get-rejection-info')
  async getRejectionInfo(
    @Query('username') username: string,
  ) {
    return this.authenticationService.getRejectionInfo(username);
  }


  @Get('get-details')
  async getDetails(
    @Query('sessionId') session_id: string,
  ) {
    return this.authenticationService.getUserDetailBySessionId(session_id);
  }

  @Patch('user_id')
  async updateUserStatus(
    @Param('user_id') user_id: string,
    @Body() userDto: UserDto,
  ) {
    return this.authenticationService.updateUserStatus(user_id, userDto);
  }

  @Get('pending-suppliers')
  async findAllPendingSuppliers() {
    return this.authenticationService.findAllPendingSuppliers();
  }
  @Get('rejected-suppliers')
  async findAllRejectedSuppliers() {
    return this.authenticationService.findAllRejectedSuppliers();
  }

  @Get('approved-suppliers')
  async findAllApprovedSuppliers() {
    return this.authenticationService.findAllApprovedSuppliers();
  }

  @Get('user_id')
  async findSupplierById(@Param('user_id') user_id: string) {
    return this.authenticationService.findSupplierById(user_id);
  }

  @Patch('approve')
  async approveSupplierReviewStatus(
    @Query('userId') user_id: string,
    @Body() supplierDto: SupplierDto,
  ) {
    return this.authenticationService.approveSupplierReviewStatus(user_id, supplierDto);
  }

  @Patch('reject')
  async rejectSupplierReviewStatus(
    @Query('userId') user_id: string,
    @Body() supplierDto: SupplierDto,
  ) {
    return this.authenticationService.rejectSupplierReviewStatus(user_id, supplierDto);
  }

  @Get('admins')
  async findAllAdmin() {
    return this.authenticationService.findAllAdmins();
  }

  @Get('user_id')
  async findAdminById(@Param('user_id') user_id: string) {
    return this.authenticationService.findAdminById(user_id);
  }

  @Patch('update-admin')
  async updateAdmin(
    @Query('userId') user_id: string,
    @Body() adminDto: AdminDto,
  ) {
    return this.authenticationService.updateAdminById(user_id, adminDto);
  }
}
