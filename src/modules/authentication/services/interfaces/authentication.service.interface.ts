import { User } from '../../domain/schema/user.schema';
import { Admin } from '../../domain/schema/admin.schema';
import { Supplier } from '../../domain/schema/supplier.schema';

import { UserDto } from '../../dtos/user.dto';
import { AdminDto } from "../../dtos/admin.dto";
import { SupplierDto } from "../../dtos/supplier.dto";


export interface IAuthenticationService {
  createUser(userDto: UserDto): Promise<Supplier | Admin>;
  getUserDetailBySessionId(sessionId: string): Promise<User>;
  findUser(filterDto): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findUserById(user_id: string): Promise<User>;
  findAllUsersByFilter(filterDto);
  updateUserStatus(user_id: string, userDto: UserDto): Promise<User>;
  checkEmailDuplicate(email: string): Promise<boolean>
  checkUsernameDuplicate(username: string): Promise<boolean>

  createSupplier(supplierDto: SupplierDto): Promise<Supplier>;
  findAllSuppliers(): Promise<Supplier[]>;
  findAllInactiveSuppliers(): Promise<Supplier[]>;
  findAllActiveSuppliers(): Promise<Supplier[]>;
  findSupplierById(user_id: string): Promise<Supplier>;
  approveSupplierReviewStatus(user_id: string);
  rejectSupplierReviewStatus(user_id: string, supplierDto: SupplierDto);

  createAdmin(adminDto: AdminDto): Promise<Admin>;
  findAllAdmins(): Promise<Admin[]>;
  findAdminById(user_id: string): Promise<Admin>;
}
