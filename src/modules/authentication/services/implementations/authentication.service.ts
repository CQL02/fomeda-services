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

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supplierRepository: SupplierRepository,
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
    @Inject(SessionService.name) private readonly sessionService: ISessionService,
    @Inject(RoleService.name) private readonly roleService: IRoleService,
  ) {
  }

  async login(req: any): Promise<any> {
    const { fullname, username, type, email_address, user_id, is_active, role_id } = req?.user || {};

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

    const response = await this.userRepository.create({ ...userDto, password: hashedPassword, status: "pending_review" });

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

  async getUserDetailBySessionId(sessionId: string): Promise<UserDto> {
    const userId = await this.sessionService.validateSession(sessionId);
    return this.userRepository.findOneByFilter({ user_id: userId }, { _id: 0, password: 0 });
  }

  async generateJwtToken(user: UserDto): Promise<string> {
    const payload = { username: user.username, type: user.type };
    return this.jwtService.sign(payload);
  }

  async findUser(filterDto): Promise<UserDto> {
    return this.userRepository.findOneByFilter(filterDto, { _id: 0 });
  }

  async findAllUsers(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async findAllUsersByFilter(filterDto): Promise<UserDto[]> {
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

  async checkUsernameDuplicate(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneByFilter({ username });
    return !!user;
  }

  async checkSupplierStatus(username: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({ username, type: "supplier" });

    if (!user)
      throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);
    else {
      return {
        status: user?.status
      }
    }
  }

  async getRejectionInfo(username: string): Promise<any> {
    const user = await this.userRepository.findOneByFilter({username})
    const user_id = user?.user_id;
    const supplier = await this.supplierRepository.findOneByFilter({user_id});

    const lastRejection = supplier?.rejection.slice(-1)[0];

    if (lastRejection) {
      const { rejected_on, reason } = lastRejection;
      return { rejected_on, reason };
    }

    throw new AuthException(AuthErrorConstant.USER_NOT_FOUND);
  }

  async createSupplier(supplierDto: SupplierDto): Promise<SupplierDto> {
    return this.supplierRepository.create({ ...supplierDto });
  }

  async findAllSuppliers(): Promise<SupplierDto[]> {
    return this.supplierRepository.findAll();
  }

  async findAllInactiveSuppliers(): Promise<SupplierDto[]> {
    const pipeline = [
      { $match: { type: 'supplier', is_active: false } },
      {
        $lookup: {
          from: 'supplier',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'supplier_info',
        },
      },
      { $unwind: '$supplier_info' },
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
          },
        },
      },
    ];
    return await this.userRepository.aggregate(pipeline);
  }

  async findAllActiveSuppliers(): Promise<SupplierDto[]> {
    const pipeline = [
      //lookup from supplier collection to find supplier info
      { $match: { type: 'supplier', is_active: true } },
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
    await this.userRepository.updateOneByFilter({ user_id }, { is_active: true, status: "approved" });
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

    await this.userRepository.updateOneByFilter({user_id}, {status: "rejected"});
    return this.supplierRepository.updateOneByFilter({ user_id }, {
      $push: { rejection: rejection },
      last_updated_on: new Date(),
      status: "rejected"
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

}
