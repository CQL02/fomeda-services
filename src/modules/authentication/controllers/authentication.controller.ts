import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Request, Query, Inject, Res, Req,
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
import { OtpDto } from '../dtos/otp.dto';
import { Request as ExpressRequest, Response } from 'express';

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

  @Get('check-forget-password-email')
  async checkForgetPasswordEmail(
    @Query('email') email: string,
  ) {
    return this.authenticationService.checkForgetPasswordEmail(email);
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
    @Query('user_id') user_id: string,
  ) {
    return this.authenticationService.getRejectionInfo(user_id);
  }

  @Get('get-appeal-info')
  async getAppealInfo(
    @Query('user_id') user_id: string,
  ) {
    return this.authenticationService.getAppealInfo(user_id);
  }

  @Patch('appeal')
  async Appeal(
    @Query('user_id') user_id: string,
    @Body() userDto: UserDto
  ) {
    return this.authenticationService.appealRegistration(user_id, userDto);
  }

  @Get('get-details')
  async getDetails(
    @Query('sessionId') session_id: string,
  ) {
    return this.authenticationService.getUserDetailBySessionId(session_id);
  }

  @Get('get-profile-info')
  async getProfileInfo(
    @Query('user_id') user_id: string,
  ) {
    return this.authenticationService.getProfileInfo(user_id);
  }

  @Patch('update-profile')
  async updateProfile(
    @Query('user_id') user_id: string,
    @Body() userDto: UserDto
  ) {
    return this.authenticationService.updateProfile(user_id, userDto);
  }

  @Patch('update-password')
  async updatePassword(
    @Query('user_id') user_id: string,
    @Body() userDto: UserDto
  ) {
    return this.authenticationService.updatePassword(user_id, userDto);
  }

  @Patch('reset-password')
  async resetPassword(
    @Query('user_id') user_id: string,
    @Body() userDto: UserDto
  ) {
    return this.authenticationService.resetPassword(user_id, userDto);
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

  @Post('send-otp')
  async sendOtp(
    @Body() otpDto: OtpDto,
  ) {
    return this.authenticationService.sendOTP(otpDto);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() otpDto: OtpDto,
    @Res() res: Response,
    @Req() req: ExpressRequest
  ) {
    return this.authenticationService.verifyOTP(otpDto, req, res);
  }

  @Post('send-delete-otp')
  async sendDeleteOtp(
    @Body() otpDto: OtpDto,
  ) {
    return this.authenticationService.sendDeleteOTP(otpDto);
  }

  @Post('verify-delete-otp')
  async verifyDeleteOtp(
    @Body() otpDto: OtpDto,
    @Res() res: Response
  ) {
    return this.authenticationService.verifyDeleteOTP(otpDto, res);
  }

  @Get('get-email')
  async getEmail(
    @Query('user_id') user_id: string,
  ) {
    return this.authenticationService.getEmail(user_id);
  }

  @Patch('delete-account')
  async deleteAccount(
    @Query('user_id') user_id: string,
  ) {
    return this.authenticationService.deleteAccount(user_id);
  }
}
