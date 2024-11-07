"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../domain/repositories/user.repository");
const supplier_repository_1 = require("../../domain/repositories/supplier.repository");
const admin_repository_1 = require("../../domain/repositories/admin.repository");
const session_service_1 = require("./session.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const role_service_1 = require("../../../role/services/implementations/role.service");
const auth_exception_1 = require("../../../../common/exception/auth.exception");
const mailer_service_1 = require("../../../mailer/mailer.service");
const crypto_1 = require("crypto");
const otp_repository_1 = require("../../domain/repositories/otp.repository");
let AuthenticationService = class AuthenticationService {
    constructor(userRepository, supplierRepository, adminRepository, otpRepository, jwtService, mailerService, sessionService, roleService) {
        this.userRepository = userRepository;
        this.supplierRepository = supplierRepository;
        this.adminRepository = adminRepository;
        this.otpRepository = otpRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.sessionService = sessionService;
        this.roleService = roleService;
    }
    async login(req) {
        const { fullname, username, type, email_address, user_id, is_active, role_id, deleted } = req?.user || {};
        if (deleted)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        if (!is_active)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.INVALID_STATUS);
        const sessionId = await this.sessionService.findSessionIdByUserId(user_id);
        if (!sessionId)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.INVALID_SESSION);
        let payload = { fullname, username, email_address, user_id, role: type };
        if (type === 'supplier') {
            payload = { ...payload, sessionId, modules: ['product_management'] };
        }
        else if (type === 'admin') {
            const { modules, is_active: isRoleActive } = await this.roleService.getModules(role_id) || {};
            if (!isRoleActive)
                throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.INVALID_ROLE);
            payload = { ...payload, sessionId, modules };
        }
        const jwtToken = this.jwtService.sign(payload);
        return {
            token: jwtToken,
            sessionId,
        };
    }
    async logout(sessionId) {
        await this.sessionService.deleteSession(sessionId);
        return {
            message: 'Logout successful',
        };
    }
    async createUser(userDto) {
        let hashedPassword;
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
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else if (response?.type === 'supplier') {
            const supplierDto = {
                user_id: response?.user_id,
                company_name: userDto.company_name,
                company_no: userDto.company_no,
                company_address: userDto.company_address,
            };
            return this.createSupplier(supplierDto);
        }
        else if (response?.type === 'admin') {
            const adminDto = {
                user_id: response?.user_id,
                created_by: userDto?.created_by,
                last_updated_by: userDto?.last_updated_by,
            };
            return this.createAdmin(adminDto);
        }
        throw new Error('Internal error');
    }
    async updatePassword(user_id, userDto) {
        const user = await this.userRepository.findOneByFilter({ user_id });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        const isMatch = await bcrypt.compare(userDto?.password, user?.password);
        if (!isMatch) {
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.INVALID_OLD_PASSWORD);
        }
        const hashedPassword = await bcrypt.hash(userDto?.new_password, 14);
        try {
            await this.userRepository.updateOneByFilter({ user_id }, { password: hashedPassword });
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async resetPassword(user_id, userDto) {
        const user = await this.userRepository.findOneByFilter({ user_id });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        const hashedPassword = await bcrypt.hash(userDto?.password, 14);
        try {
            await this.userRepository.updateOneByFilter({ user_id }, { password: hashedPassword });
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async getUserDetailBySessionId(sessionId) {
        const userId = await this.sessionService.validateSession(sessionId);
        return this.userRepository.findOneByFilter({ user_id: userId }, { _id: 0, password: 0 });
    }
    async generateJwtToken(user) {
        const payload = { username: user.username, type: user.type };
        return this.jwtService.sign(payload);
    }
    async findUser(filterDto) {
        return this.userRepository.findOneByFilter(filterDto, { _id: 0 });
    }
    async findAllUsers() {
        return this.userRepository.findAll();
    }
    async findAllUsersByFilter(filterDto) {
        return this.userRepository.findAllByFilter(filterDto);
    }
    async findUserById(user_id) {
        return this.userRepository.findOneByFilter({ user_id });
    }
    async updateUserStatus(user_id, userDto) {
        return this.userRepository.updateOneByFilter({ user_id }, { is_active: userDto.is_active });
    }
    async checkEmailDuplicate(email) {
        const user = await this.userRepository.findOneByFilter({ email_address: email });
        return !!user;
    }
    async checkForgetPasswordEmail(email) {
        const user = await this.userRepository.findOneByFilter({ email_address: email });
        return {
            exist: !!user,
            ...(user?.user_id && { user_id: user.user_id }),
        };
    }
    async checkUsernameDuplicate(username) {
        const user = await this.userRepository.findOneByFilter({ username });
        return !!user;
    }
    async checkSupplierStatus(username) {
        const user = await this.userRepository.findOneByFilter({ username, type: 'supplier', deleted: { $ne: true } });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        else {
            return {
                status: user?.status,
                ...(user.status === 'rejected' && { user_id: user.user_id }),
            };
        }
    }
    async getRejectionInfo(user_id) {
        const supplier = await this.supplierRepository.findOneByFilter({ user_id });
        const lastRejection = supplier?.rejection.slice(-1)[0];
        if (lastRejection) {
            const { rejected_on, reason } = lastRejection;
            return { rejected_on, reason };
        }
        throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
    }
    async getAppealInfo(user_id) {
        const user = await this.userRepository.findOneByFilter({ user_id, status: 'rejected' });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        const supplier = await this.supplierRepository.findOneByFilter({ user_id });
        if (!supplier)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
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
    async appealRegistration(user_id, userDto) {
        try {
            await this.userRepository.updateOneByFilter({ user_id, status: 'rejected' }, {
                ...userDto, status: 'pending_review',
            });
            await this.supplierRepository.updateOneByFilter({ user_id }, {
                ...userDto,
                last_updated_on: new Date(),
            });
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async getProfileInfo(user_id) {
        const user = await this.userRepository.findOneByFilter({ user_id });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        if (user?.type === 'supplier') {
            const supplier = await this.supplierRepository.findOneByFilter({ user_id });
            if (!supplier)
                throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
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
        }
        else {
            const admin = await this.adminRepository.findOneByFilter({ user_id });
            if (!admin)
                throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
            return {
                user_id: user?.user_id,
                fullname: user?.fullname,
                username: user?.username,
                email_address: user?.email_address,
                created_on: admin?.created_on,
            };
        }
    }
    async updateProfile(user_id, userDto) {
        const user = await this.userRepository.findOneByFilter({ user_id });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        const type = user?.type;
        if (type === 'supplier') {
            return await this.updateSupplierById(user_id, userDto);
        }
        else if (type === 'admin') {
            return await this.updateAdminById(user_id, userDto);
        }
        throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
    }
    async createSupplier(supplierDto) {
        return await this.supplierRepository.create(supplierDto);
    }
    async findAllSuppliers() {
        return await this.supplierRepository.findAll();
    }
    async findAllPendingSuppliers() {
        const pipeline = [
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
            {
                $lookup: {
                    from: 'user',
                    localField: 'supplier_info.rejection.rejected_by',
                    foreignField: 'user_id',
                    as: 'rejected_users',
                },
            },
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
    async findAllRejectedSuppliers() {
        const pipeline = [
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
            {
                $lookup: {
                    from: 'user',
                    localField: 'supplier_info.rejection.rejected_by',
                    foreignField: 'user_id',
                    as: 'rejected_users',
                },
            },
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
    async findAllApprovedSuppliers() {
        const pipeline = [
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
            {
                $lookup: {
                    from: 'user',
                    localField: 'supplier_info.rejection.rejected_by',
                    foreignField: 'user_id',
                    as: 'rejected_users',
                },
            },
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
    async findSupplierById(user_id) {
        return this.supplierRepository.findOneByFilter({ user_id });
    }
    async approveSupplierReviewStatus(user_id, supplierDto) {
        await this.userRepository.updateOneByFilter({ user_id }, { is_active: true, status: 'approved' });
        return this.supplierRepository.updateOneByFilter({ user_id }, {
            ...supplierDto,
            last_updated_on: new Date(),
            approved_on: new Date(),
        });
    }
    async rejectSupplierReviewStatus(user_id, supplierDto) {
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
    async updateSupplierById(user_id, supplierDto) {
        await this.userRepository.updateOneByFilter({ user_id }, { ...supplierDto });
        return await this.supplierRepository.updateOneByFilter({ user_id }, {
            ...supplierDto,
            last_updated_on: new Date(),
        });
    }
    async createAdmin(adminDto) {
        return this.adminRepository.create({ ...adminDto });
    }
    async findAllAdmins() {
        const pipeline = [
            { $match: { type: 'admin' } },
            {
                $lookup: {
                    from: 'admin',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'admin_info',
                },
            },
            { $unwind: '$admin_info' },
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
    async findAdminById(user_id) {
        return this.adminRepository.findOneByFilter({ user_id });
    }
    async updateAdminById(user_id, adminDto) {
        await this.userRepository.updateOneByFilter({ user_id }, { ...adminDto });
        return await this.adminRepository.updateOneByFilter({ user_id }, { ...adminDto, last_updated_on: new Date() });
    }
    async sendOTP(otpDto) {
        const email = otpDto?.email;
        const otp = (0, crypto_1.randomInt)(100000, 999999).toString();
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
    async verifyOTP(otpDto, res) {
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
    async getEmail(user_id) {
        const user = await this.userRepository.findOneByFilter({ user_id });
        if (!user)
            throw new auth_exception_1.AuthException(auth_exception_1.AuthErrorConstant.USER_NOT_FOUND);
        return {
            email_address: user?.email_address,
        };
    }
    async sendDeleteOTP(otpDto) {
        const email = otpDto?.email;
        const otp = (0, crypto_1.randomInt)(100000, 999999).toString();
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
    async verifyDeleteOTP(otpDto, res) {
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
    async deleteAccount(user_id) {
        const user = await this.userRepository.updateOneByFilter({ user_id }, {
            is_active: false,
            deleted: true,
        });
        return !!user;
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)(session_service_1.SessionService.name)),
    __param(7, (0, common_1.Inject)(role_service_1.RoleService.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        supplier_repository_1.SupplierRepository,
        admin_repository_1.AdminRepository,
        otp_repository_1.OtpRepository,
        jwt_1.JwtService,
        mailer_service_1.MailerService, Object, Object])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map