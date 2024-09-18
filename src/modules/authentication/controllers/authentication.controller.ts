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
import { RoleService } from '../../role/services/implementations/role.service';
import { IRoleService } from '../../role/services/interfaces/role.service.interface';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthenticationController {

  constructor(@Inject(AuthenticationService.name) private readonly authenticationService: IAuthenticationService,
              @Inject(SessionService.name) private readonly sessionService: ISessionService,
              @Inject(RoleService.name) private readonly roleService: IRoleService,
              private readonly jwtService: JwtService
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
    const { fullname, username, type, email_address, user_id: userId, is_active: isUserActive, role_id: roleId } = req?.user || {};

    if (!isUserActive) return null;

    const sessionId = await this.sessionService.findSessionIdByUserId(userId);
    if (!sessionId) return null;

    let payload: any = { fullname, username, email_address, sub: userId, role: type };

    if (type === 'supplier') {

      payload = { ...payload, sessionId, modules: ['product_management']};
    } else if (type === 'admin') {
      const { modules, is_active: isRoleActive } = await this.roleService.getModules(roleId) || {};

      if (!isRoleActive) return null;

      payload = { ...payload, sessionId, modules };
    }

    const jwtToken = this.jwtService.sign(payload);

    return {
      token: jwtToken,
      sessionId,
    };

  }

  @Post('logout')
  async logout(
    @Body() sessionDto: SessionDto,
  ) {
    const sessionId = sessionDto?.session_id;
    await this.sessionService.deleteSession(sessionId as string);
    return { message: 'Logout successful' };
  }

  // @UseGuards(JwtAuthGuard)
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

  @Get('inactive-suppliers')
  async findAllInactiveSuppliers() {
    return this.authenticationService.findAllInactiveSuppliers();
  }

  @Get('active-suppliers')
  async findAllActiveSuppliers() {
    return this.authenticationService.findAllActiveSuppliers();
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
    @Body() userDto: UserDto,
  ) {
    return this.authenticationService.updateAdminById(user_id, userDto);
  }
}
