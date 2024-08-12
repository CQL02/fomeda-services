import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/authentication.service.interface';
import { UserDto } from '../../dtos/user.dto';
import { User } from '../../domain/schema/user.schema';
import { UserRepository } from '../../domain/repositories/user.repository';
import { SupplierDto } from '../../dtos/supplier.dto';
import { Supplier } from '../../domain/schema/supplier.schema';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { AdminDto } from '../../dtos/admin.dto';
import { Admin } from '../../domain/schema/admin.schema';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { SessionService } from './session.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supplierRepository: SupplierRepository,
    private readonly adminRepository: AdminRepository,
    private readonly sessionService: SessionService
  ) {
  }

  async createUser(userDto): Promise<Supplier | Admin> {
    const hashedPassword = await bcrypt.hash(userDto?.password, 14);

    const response = await this.userRepository.create({ ...userDto, password: hashedPassword });

    if (!response) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (response?.type === 'supplier') {
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
      };
      return this.createAdmin(adminDto);
    }

    throw new Error('Internal error');
  }

  async getUserDetailBySessionId(sessionId: string): Promise<User> {
    const userId = await this.sessionService.validateSession(sessionId);
    return this.userRepository.findOneByFilter({user_id: userId}, {_id: 0, password: 0});
  }

  async findUser(filterDto): Promise<User> {
    return this.userRepository.findOneByFilter(filterDto, { _id: 0 });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findAllUsersByFilter(filterDto): Promise<User[]> {
    return this.userRepository.findAllByFilter(filterDto);
  }

  async findUserById(user_id: string): Promise<User> {
    return this.userRepository.findOneByFilter({ user_id });
  }

  async updateUserStatus(user_id: string, userDto: UserDto): Promise<User> {
    return this.userRepository.updateOneByFilter({ user_id }, { is_active: userDto.is_active });
  }

  async createSupplier(supplierDto: SupplierDto): Promise<Supplier> {
    return this.supplierRepository.create({ ...supplierDto });
  }

  async findAllSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.findAll();
  }

  async findSupplierById(user_id: string): Promise<Supplier> {
    return this.supplierRepository.findOneByFilter({ user_id });
  }

  async updateSupplierReviewStatus(user_id: string, supplierDto: SupplierDto): Promise<Supplier> {
    return this.supplierRepository.updateOneByFilter({ user_id }, { review_status: supplierDto.review_status });
  }

  async createAdmin(adminDto: AdminDto): Promise<Admin> {
    return this.adminRepository.create({ ...adminDto });
  }

  async findAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.findAll();
  }

  async findAdminById(user_id: string): Promise<Admin> {
    return this.adminRepository.findOneByFilter({ user_id });
  }
}
