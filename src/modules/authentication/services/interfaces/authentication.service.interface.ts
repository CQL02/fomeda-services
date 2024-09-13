import { UserDto } from '../../dtos/user.dto';
import { AdminDto } from "../../dtos/admin.dto";
import { SupplierDto } from "../../dtos/supplier.dto";


export interface IAuthenticationService {
  createUser(userDto: UserDto): Promise<UserDto | AdminDto>;
  getUserDetailBySessionId(sessionId: string): Promise<UserDto>;
  findUser(filterDto): Promise<UserDto>;
  findAllUsers(): Promise<UserDto[]>;
  findUserById(user_id: string): Promise<UserDto>;
  findAllUsersByFilter(filterDto);
  updateUserStatus(user_id: string, userDto: UserDto): Promise<UserDto>;
  checkEmailDuplicate(email: string): Promise<boolean>
  checkUsernameDuplicate(username: string): Promise<boolean>

  createSupplier(supplierDto: SupplierDto): Promise<SupplierDto>;
  findAllSuppliers(): Promise<SupplierDto[]>;
  findAllInactiveSuppliers(): Promise<SupplierDto[]>;
  findAllActiveSuppliers(): Promise<SupplierDto[]>;
  findSupplierById(user_id: string): Promise<SupplierDto>;
  approveSupplierReviewStatus(user_id: string);
  rejectSupplierReviewStatus(user_id: string, supplierDto: SupplierDto);

  createAdmin(adminDto: AdminDto): Promise<AdminDto>;
  findAllAdmins(): Promise<AdminDto[]>;
  findAdminById(user_id: string): Promise<AdminDto>;
  updateAdminById(user_id: string, adminDto: UserDto): Promise<UserDto>
}
