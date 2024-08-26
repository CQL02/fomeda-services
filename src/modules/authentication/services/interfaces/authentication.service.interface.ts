import { User } from '../../domain/schema/user.schema';
import { Admin } from '../../domain/schema/admin.schema';
import { Supplier } from '../../domain/schema/supplier.schema';

import { UserDto } from '../../dtos/user.dto';
import { AdminDto } from "../../dtos/admin.dto";
import { SupplierDto } from "../../dtos/supplier.dto";


export interface IUserService {
  createUser(userDto: UserDto): Promise<Supplier | Admin>;
  findAllUsers(): Promise<User[]>;
  findUserById(user_id: string): Promise<User>;
  findAllUsersByFilter(filterDto);
  updateUserStatus(user_id: string, userDto: UserDto): Promise<User>;

  createSupplier(supplierDto: SupplierDto): Promise<Supplier>;
  findAllSuppliers(): Promise<Supplier[]>;
  findSupplierById(user_id: string): Promise<Supplier>;
  updateSupplierReviewStatus(user_id: string);

  createAdmin(adminDto: AdminDto): Promise<Admin>;
  findAllAdmins(): Promise<Admin[]>;
  findAdminById(user_id: string): Promise<Admin>;
}
