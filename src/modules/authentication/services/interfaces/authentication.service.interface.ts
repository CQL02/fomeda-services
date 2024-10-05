import { UserDto } from '../../dtos/user.dto';
import { AdminDto } from "../../dtos/admin.dto";
import { SupplierDto } from "../../dtos/supplier.dto";

export interface IAuthenticationService {
  login(userDto: UserDto): Promise<any>
  logout(sessionId: string): Promise<any>
  createUser(userDto: UserDto): Promise<SupplierDto | AdminDto>;
  getUserDetailBySessionId(sessionId: string): Promise<UserDto>;
  generateJwtToken(user: UserDto): Promise<string>
  findUser(filterDto): Promise<UserDto>;
  findAllUsers(): Promise<UserDto[]>;
  findUserById(user_id: string): Promise<UserDto>;
  findAllUsersByFilter(filterDto);
  updateUserStatus(user_id: string, userDto: UserDto): Promise<UserDto>;
  checkEmailDuplicate(email: string): Promise<boolean>
  checkUsernameDuplicate(username: string): Promise<boolean>
  checkSupplierStatus(username: string): Promise<any>
  getRejectionInfo(username: string): Promise<any>
  getAppealInfo(user_id: string): Promise<any>
  appealRegistration(user_id: string, userDto: UserDto): Promise<any>
  getProfileInfo(user_id: string): Promise<any>
  updateProfile(user_id: string, userDto: UserDto): Promise<SupplierDto | AdminDto>
  updatePassword(user_id: string, userDto: UserDto): Promise<any>;

  createSupplier(supplierDto: SupplierDto): Promise<SupplierDto>;
  findAllSuppliers(): Promise<SupplierDto[]>;
  findAllPendingSuppliers(): Promise<SupplierDto[]>;
  findAllRejectedSuppliers(): Promise<SupplierDto[]>;
  findAllApprovedSuppliers(): Promise<SupplierDto[]>;
  findSupplierById(user_id: string): Promise<SupplierDto>;
  approveSupplierReviewStatus(user_id: string, supplierDto: SupplierDto);
  rejectSupplierReviewStatus(user_id: string, supplierDto: SupplierDto);
  updateSupplierById(user_id: string, supplierDto: SupplierDto): Promise<SupplierDto>

  createAdmin(adminDto: AdminDto): Promise<AdminDto>;
  findAllAdmins(): Promise<AdminDto[]>;
  findAdminById(user_id: string): Promise<AdminDto>;
  updateAdminById(user_id: string, adminDto: AdminDto): Promise<AdminDto>
}
