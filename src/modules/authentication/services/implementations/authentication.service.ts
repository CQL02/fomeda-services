import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthenticationService } from '../interfaces/authentication.service.interface';
import { UserDto } from '../../dtos/user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { SupplierDto } from '../../dtos/supplier.dto';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { AdminDto } from '../../dtos/admin.dto';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { SessionService } from './session.service';
import * as bcrypt from 'bcrypt';
import { ISessionService } from '../interfaces/session.service.interface';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../../../role/services/implementations/role.service';
import { IRoleService } from '../../../role/services/interfaces/role.service.interface';
import { AuthErrorConstant, AuthException } from '../../../../common/exception/auth.exception';
import { MailerService } from '../../../mailer/mailer.service';
import { randomInt } from 'crypto';
import { OtpRepository } from '../../domain/repositories/otp.repository';
import { OtpDto } from '../../dtos/otp.dto';
import { Response } from 'express';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supplierRepository: SupplierRepository,
    private readonly adminRepository: AdminRepository,
    private readonly otpRepository: OtpRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject(SessionService.name) private readonly sessionService: ISessionService,
    @Inject(RoleService.name) private readonly roleService: IRoleService,
  ) {
  }

  async login(req: any): Promise<any> {
    const { fullname, username, type, email_address, user_id, is_active, role_id, deleted } = req?.user || {};

    if (deleted)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    if (!is_active)
      throw new AuthException(AuthErrorConstant.INVALID_STATUS);

    const sessionId = await this.sessionService.findSessionIdByUserId(user_id);
    if (!sessionId)
      throw new AuthException(AuthErrorConstant.INVALID_SESSION);

    let payload: any = { fullname, username, email_address, user_id, role: type };

    if (type === 'supplier') {
      payload = { ...payload, sessionId, modules: ['product_management'] };
    } else if (type === 'admin') {
      const { modules, is_active: isRoleActive } = await this.roleService.getModules(role_id) || {};

      if (!isRoleActive)
        throw new AuthException(AuthErrorConstant.INVALID_ROLE);

      payload = { ...payload, sessionId, modules };
    }

    const jwtToken = this.jwtService.sign(payload);

    return {
      token: jwtToken,
      sessionId,
    };
  }

  async logout(sessionId: string): Promise<any> {
    await this.sessionService.deleteSession(sessionId);
    return {
      message: 'Logout successful',
    };
  }

  async createUser(userDto): Promise<SupplierDto | AdminDto> {
    let hashedPassword: string;

    if (userDto?.type === 'supplier')
      hashedPassword = await bcrypt.hash(userDto?.password, 14);
    else if (userDto?.type === 'admin')
      hashedPassword = await bcrypt.hash('123456@ABCdefg', 14);

    const response = await this.userRepository.create({
      ...userDto,
      password: hashedPassword,
      status: 'pending_review',
    });

    if (!response) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (response?.type === 'supplier') {
      const supplierDto = {
        user_id: response?.user_id,
        company_name: userDto.company_name,
        company_no: userDto.company_no,
        company_address: userDto.company_address,
      };
      return this.createSupplier(supplierDto);
    } else if (response?.type === 'admin') {
      const adminDto = {
        user_id: response?.user_id,
        created_by: userDto?.created_by,
        last_updated_by: userDto?.last_updated_by,
      };
      return this.createAdmin(adminDto);
    }

    throw new Error('Internal error');
  }

  async updatePassword(user_id: string, userDto: UserDto): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ user_id });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(userDto?.password, user?.password);

    if (!isMatch) {
      throw new AuthException(AuthErrorConstant.INVALID_OLD_PASSWORD);
    }
    const hashedPassword = await bcrypt.hash(userDto?.new_password, 14);

    try {
      await this.userRepository.updateOneByFilter({ user_id }, { password: hashedPassword });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async resetPassword(user_id: string, userDto: UserDto): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ user_id });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    const hashedPassword = await bcrypt.hash(userDto?.password, 14);

    try {
      await this.userRepository.updateOneByFilter({ user_id }, { password: hashedPassword });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getUserDetailBySessionId(sessionId: string): Promise<UserDto> {
    const userId = await this.sessionService.validateSession(sessionId);
    return this.userRepository.findOneByFilter({ user_id: userId }, { _id: 0, password: 0 });
  }

  async generateJwtToken(user: UserDto): Promise<string> {
    const payload = { username: user.username, type: user.type };
    return this.jwtService.sign(payload);
  }

  async findUser(filterDto: any): Promise<UserDto> {
    return this.userRepository.findOneByFilter(filterDto, { _id: 0 });
  }

  async findAllUsers(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async findAllUsersByFilter(filterDto: any): Promise<UserDto[]> {
    return this.userRepository.findAllByFilter(filterDto);
  }

  async findUserById(user_id: string): Promise<UserDto> {
    return this.userRepository.findOneByFilter({ user_id });
  }

  async updateUserStatus(user_id: string, userDto: UserDto): Promise<UserDto> {
    return this.userRepository.updateOneByFilter({ user_id }, { is_active: userDto.is_active });
  }

  async checkEmailDuplicate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByFilter({ email_address: email });
    return !!user;
  }

  async checkForgetPasswordEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ email_address: email });
    return {
      exist: !!user,
      ...(user?.user_id && { user_id: user.user_id }),
    };
  }

  async checkUsernameDuplicate(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneByFilter({ username });
    return !!user;
  }

  async checkSupplierStatus(username: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ username, type: 'supplier', deleted: { $ne: true } });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);
    else {
      return {
        status: user?.status,
        ...(user.status === 'rejected' && { user_id: user.user_id }),
      };
    }
  }

  async getRejectionInfo(user_id: string): Promise<any> {
    const supplier = await this.supplierRepository.findOneByFilter({ user_id });

    const lastRejection = supplier?.rejection.slice(-1)[0];

    if (lastRejection) {
      const { rejected_on, reason } = lastRejection;
      return { rejected_on, reason };
    }

    throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);
  }

  async getAppealInfo(user_id: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ user_id, status: 'rejected' });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    const supplier = await this.supplierRepository.findOneByFilter({ user_id });

    if (!supplier)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    return {
      user_id: user?.user_id,
      fullname: user?.fullname,
      username: user?.username,
      email_address: user?.email_address,
      company_name: supplier?.company_name,
      company_no: supplier?.company_no,
      company_address: supplier?.company_address,
    };
  }

  async appealRegistration(user_id: string, userDto: UserDto): Promise<any> {
    try {
      await this.userRepository.updateOneByFilter({ user_id, status: 'rejected' }, {
        ...userDto, status: 'pending_review',
      });
      await this.supplierRepository.updateOneByFilter({ user_id }, {
        ...userDto,
        last_updated_on: new Date(),
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getProfileInfo(user_id: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ user_id });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    if (user?.type === 'supplier') {
      const supplier = await this.supplierRepository.findOneByFilter({ user_id });

      if (!supplier)
        throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

      return {
        user_id: user?.user_id,
        fullname: user?.fullname,
        username: user?.username,
        email_address: user?.email_address,
        company_name: supplier?.company_name,
        company_no: supplier?.company_no,
        company_address: supplier?.company_address,
        registered_on: supplier?.registered_on,
        approved_on: supplier?.approved_on,
      };
    } else {
      const admin = await this.adminRepository.findOneByFilter({ user_id });

      if (!admin)
        throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

      return {
        user_id: user?.user_id,
        fullname: user?.fullname,
        username: user?.username,
        email_address: user?.email_address,
        created_on: admin?.created_on,
      };
    }
  }

  async updateProfile(user_id: string, userDto): Promise<SupplierDto | AdminDto> {
    const user = await this.userRepository.findOneByFilter({ user_id });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    const type = user?.type;

    if (type === 'supplier') {
      return await this.updateSupplierById(user_id, userDto);
    } else if (type === 'admin') {
      return await this.updateAdminById(user_id, userDto);
    }

    throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);
  }

  async createSupplier(supplierDto: SupplierDto): Promise<SupplierDto> {
    return await this.supplierRepository.create(supplierDto);
  }

  async findAllSuppliers(): Promise<SupplierDto[]> {
    return await this.supplierRepository.findAll();
  }

  async findAllPendingSuppliers(): Promise<SupplierDto[]> {
    const pipeline = [
      //lookup from supplier collection to match user_id
      { $match: { type: 'supplier', is_active: false, status: 'pending_review' } },
      {
        $lookup: {
          from: 'supplier',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'supplier_info',
        },
      },
      { $unwind: '$supplier_info' },

      //lookup from users to map rejected_by in each rejection object
      {
        $lookup: {
          from: 'user',
          localField: 'supplier_info.rejection.rejected_by',
          foreignField: 'user_id',
          as: 'rejected_users',
        },
      },

      //map over the rejection array and replace rejected_by with the username
      {
        $addFields: {
          'supplier_info.rejection': {
            $map: {
              input: '$supplier_info.rejection',
              as: 'rej',
              in: {
                rejected_by: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: '$rejected_users',
                            as: 'user',
                            cond: { $eq: ['$$user.user_id', '$$rej.rejected_by'] },
                          },
                        },
                        as: 'user',
                        in: '$$user.username',
                      },
                    },
                    0,
                  ],
                },
                rejected_on: '$$rej.rejected_on',
                reason: '$$rej.reason',
              },
            },
          },
        },
      },

      // Replace response
      {
        $replaceRoot: {
          newRoot: {
            _id: '$supplier_info._id',
            user_id: '$supplier_info.user_id',
            fullname: '$fullname',
            username: '$username',
            email_address: '$email_address',
            company_name: '$supplier_info.company_name',
            company_no: '$supplier_info.company_no',
            company_address: '$supplier_info.company_address',
            registered_on: '$supplier_info.registered_on',
            rejection: '$supplier_info.rejection',
          },
        },
      },
    ];
    return await this.userRepository.aggregate(pipeline);
  }

  async findAllRejectedSuppliers(): Promise<SupplierDto[]> {
    const pipeline = [
      //lookup from supplier collection to find supplier info
      { $match: { type: 'supplier', is_active: false, status: 'rejected' } },
      {
        $lookup: {
          from: 'supplier',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'supplier_info',
        },
      },
      { $unwind: '$supplier_info' },

      //lookup from users to map rejected_by in each rejection object
      {
        $lookup: {
          from: 'user',
          localField: 'supplier_info.rejection.rejected_by',
          foreignField: 'user_id',
          as: 'rejected_users',
        },
      },

      //map over the rejection array and replace rejected_by with the username
      {
        $addFields: {
          'supplier_info.rejection': {
            $map: {
              input: '$supplier_info.rejection',
              as: 'rej',
              in: {
                rejected_by: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: '$rejected_users',
                            as: 'user',
                            cond: { $eq: ['$$user.user_id', '$$rej.rejected_by'] },
                          },
                        },
                        as: 'user',
                        in: '$$user.username',
                      },
                    },
                    0,
                  ],
                },
                rejected_on: '$$rej.rejected_on',
                reason: '$$rej.reason',
              },
            },
          },
        },
      },

      // Replace response with new root
      {
        $replaceRoot: {
          newRoot: {
            _id: '$supplier_info._id',
            user_id: '$supplier_info.user_id',
            fullname: '$fullname',
            username: '$username',
            email_address: '$email_address',
            company_name: '$supplier_info.company_name',
            company_no: '$supplier_info.company_no',
            company_address: '$supplier_info.company_address',
            registered_on: '$supplier_info.registered_on',
            rejection: '$supplier_info.rejection',
            last_rejected_by: {
              $arrayElemAt: ['$supplier_info.rejection.rejected_by', -1],
            },
            last_rejected_on: {
              $arrayElemAt: ['$supplier_info.rejection.rejected_on', -1],
            },
          },
        },
      },
    ];
    return await this.userRepository.aggregate(pipeline);
  }

  async findAllApprovedSuppliers(): Promise<SupplierDto[]> {
    const pipeline = [
      //lookup from supplier collection to find supplier info
      { $match: { type: 'supplier', is_active: true, status: 'approved' } },
      {
        $lookup: {
          from: 'supplier',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'supplier_info',
        },
      },
      { $unwind: '$supplier_info' },

      // lookup from user collection to match approved_by with username
      {
        $lookup: {
          from: 'user',
          localField: 'supplier_info.approved_by',
          foreignField: 'user_id',
          as: 'approve_info',
        },
      },
      {
        $unwind: {
          path: '$approve_info',
          preserveNullAndEmptyArrays: true,
        },
      },

      //lookup from users to map rejected_by in each rejection object
      {
        $lookup: {
          from: 'user',
          localField: 'supplier_info.rejection.rejected_by',
          foreignField: 'user_id',
          as: 'rejected_users',
        },
      },

      //map over the rejection array and replace rejected_by with the username
      {
        $addFields: {
          'supplier_info.rejection': {
            $map: {
              input: '$supplier_info.rejection',
              as: 'rej',
              in: {
                rejected_by: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: '$rejected_users',
                            as: 'user',
                            cond: { $eq: ['$$user.user_id', '$$rej.rejected_by'] },
                          },
                        },
                        as: 'user',
                        in: '$$user.username',
                      },
                    },
                    0,
                  ],
                },
                rejected_on: '$$rej.rejected_on',
                reason: '$$rej.reason',
              },
            },
          },
        },
      },

      // Replace response with new root
      {
        $replaceRoot: {
          newRoot: {
            _id: '$supplier_info._id',
            user_id: '$supplier_info.user_id',
            fullname: '$fullname',
            username: '$username',
            email_address: '$email_address',
            company_name: '$supplier_info.company_name',
            company_no: '$supplier_info.company_no',
            company_address: '$supplier_info.company_address',
            registered_on: '$supplier_info.registered_on',
            approved_by: {
              $ifNull: ['$approve_info.username', '$supplier_info.approved_by'],
            },
            approved_on: '$supplier_info.approved_on',
            rejection: '$supplier_info.rejection',
          },
        },
      },
    ];
    return await this.userRepository.aggregate(pipeline);
  }

  async findSupplierById(user_id: string): Promise<SupplierDto> {
    return this.supplierRepository.findOneByFilter({ user_id });
  }

  async approveSupplierReviewStatus(user_id: string, supplierDto: SupplierDto): Promise<SupplierDto> {
    await this.userRepository.updateOneByFilter({ user_id }, { is_active: true, status: 'approved' });
    return this.supplierRepository.updateOneByFilter({ user_id }, {
      ...supplierDto,
      last_updated_on: new Date(),
      approved_on: new Date(),
    });
  }

  async rejectSupplierReviewStatus(user_id: string, supplierDto: SupplierDto): Promise<SupplierDto> {
    const rejection = {
      rejected_by: supplierDto?.rejected_by,
      rejected_on: new Date(),
      reason: supplierDto?.reason,
    };

    await this.userRepository.updateOneByFilter({ user_id }, { status: 'rejected' });
    return this.supplierRepository.updateOneByFilter({ user_id }, {
      $push: { rejection: rejection },
      last_updated_on: new Date(),
      status: 'rejected',
    });
  }

  async updateSupplierById(user_id: string, supplierDto: SupplierDto): Promise<SupplierDto> {
    await this.userRepository.updateOneByFilter({ user_id }, { ...supplierDto });
    return await this.supplierRepository.updateOneByFilter({ user_id }, {
      ...supplierDto,
      last_updated_on: new Date(),
    });
  }

  async createAdmin(adminDto: AdminDto): Promise<AdminDto> {
    return this.adminRepository.create({ ...adminDto });
  }

  async findAllAdmins(): Promise<AdminDto[]> {
    const pipeline = [
      { $match: { type: 'admin' } },
      //lookup from admin collection to find admin info
      {
        $lookup: {
          from: 'admin',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'admin_info',
        },
      },
      { $unwind: '$admin_info' },

      // lookup from user collection to match created_by username
      {
        $lookup: {
          from: 'user',
          localField: 'admin_info.created_by',
          foreignField: 'user_id',
          as: 'created_by_info',
        },
      },
      {
        $unwind: {
          path: '$created_by_info',
          preserveNullAndEmptyArrays: true,
        },
      },

      // lookup from user collection to match last_updated_by username
      {
        $lookup: {
          from: 'user',
          localField: 'admin_info.last_updated_by',
          foreignField: 'user_id',
          as: 'last_updated_by_info',
        },
      },
      {
        $unwind: {
          path: '$last_updated_by_info',
          preserveNullAndEmptyArrays: true,
        },
      },

      // replace response with new root
      {
        $replaceRoot: {
          newRoot: {
            _id: '$admin_info._id',
            user_id: '$admin_info.user_id',
            fullname: '$fullname',
            username: '$username',
            is_active: '$is_active',
            role_id: '$role_id',
            email_address: '$email_address',
            created_on: '$admin_info.created_on',
            created_by: {
              $ifNull: ['$created_by_info.username', '$admin_info.created_by'],
            },
            last_updated_on: '$admin_info.last_updated_on',
            last_updated_by: {
              $ifNull: ['$last_updated_by_info.username', '$admin_info.last_updated_by'],
            },
          },
        },
      },
    ];
    return await this.userRepository.aggregate(pipeline);
  }

  async findAdminById(user_id: string): Promise<AdminDto> {
    return this.adminRepository.findOneByFilter({ user_id });
  }

  async updateAdminById(user_id: string, adminDto: AdminDto): Promise<AdminDto> {
    await this.userRepository.updateOneByFilter({ user_id }, { ...adminDto });
    return await this.adminRepository.updateOneByFilter({ user_id }, { ...adminDto, last_updated_on: new Date() });
  }

  async sendOTP(otpDto: OtpDto): Promise<any> {
    const email = otpDto?.email;
    const otp = randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 14);

    await this.otpRepository.create({
      type: 'reset_password',
      user_email: email,
      otp: hashedOtp,
      expiration: Date.now() + 300000,
      isUsed: false,
    });

    const subject = `FOMEDA System Reset Password Verification Code`;
    const html = `
      <p>We received a request to reset your password. Please use the verification code below to proceed with resetting your password.</p>
      <p>Your OTP verification code is: <strong>${otp}</strong>. This code is valid for the <strong>next 5 minutes<strong>.</p>
      <p>If you did not request a password reset, please contact the admin. Please note that this is an automated email. Do not reply to this message.</p>
    `;

    return await this.mailerService.sendMail(email, subject, '', html);
  }

  async verifyOTP(otpDto: OtpDto, res: Response): Promise<any> {
    const email = otpDto?.email;
    const otp = otpDto?.otp;

    const otpRecords = await this.otpRepository.findAllByFilter({
      type: 'reset_password',
      user_email: email,
      is_used: false,
    });

    const validOtpRecords = otpRecords.filter(record => Date.now() <= record.expiration.getTime());

    for (const otpRecord of validOtpRecords) {
      const isOtpValid = await bcrypt.compare(otp, otpRecord?.otp);

      if (isOtpValid) {
        await this.otpRepository.updateOneByFilter(otpRecord?._id, { is_used: true });

        res.cookie('isResetVerified', 'true', {
          httpOnly: true,
          // secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 10 * 60 * 1000,
        });

        res.json({
          message: 'OTP verified successfully',
          verified: true,
        });
      }
    }

    res.json({
      message: 'OTP verified failed',
      verified: false,
    });
  }

  async getEmail(user_id: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ user_id });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);

    return {
      email_address: user?.email_address,
    };
  }

  async sendDeleteOTP(otpDto: OtpDto): Promise<any> {
    const email = otpDto?.email;
    const otp = randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 14);

    await this.otpRepository.create({
      type: 'delete_account',
      user_email: email,
      otp: hashedOtp,
      expiration: Date.now() + 300000,
      isUsed: false,
    });

    const subject = `FOMEDA System Delete Account Verification Code`;
    const html = `
      <p>We received a request to delete your account. Please use the verification code below to proceed with resetting your password.</p>
      <p>Your OTP verification code is: <strong>${otp}</strong>. This code is valid for the <strong>next 5 minutes<strong>.</p>
      <p>If you did not request a delete account, please contact the admin. Please note that this is an automated email. Do not reply to this message.</p>
    `;

    return await this.mailerService.sendMail(email, subject, '', html);
  }

  async verifyDeleteOTP(otpDto: OtpDto, res: Response): Promise<any> {
    const email = otpDto?.email;
    const otp = otpDto?.otp;

    const otpRecords = await this.otpRepository.findAllByFilter({
      type: 'delete_account',
      user_email: email,
      is_used: false,
    });

    const validOtpRecords = otpRecords.filter(record => Date.now() <= record.expiration.getTime());

    for (const otpRecord of validOtpRecords) {
      const isOtpValid = await bcrypt.compare(otp, otpRecord?.otp);

      if (isOtpValid) {
        await this.otpRepository.updateOneByFilter(otpRecord?._id, { is_used: true });

        res.cookie('isDeleteVerified', 'true', {
          httpOnly: true,
          // secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 10 * 60 * 1000,
        });

        res.json({
          message: 'OTP verified successfully',
          verified: true,
        });
      }
    }

    res.json({
      message: 'OTP verified failed',
      verified: false,
    });
  }

  async deleteAccount(user_id: string): Promise<boolean> {
    const user = await this.userRepository.updateOneByFilter({ user_id }, {
      is_active: false,
      deleted: true,
    })
    return !!user;
  }
}


