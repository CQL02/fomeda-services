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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../dtos/user.dto");
const supplier_dto_1 = require("../dtos/supplier.dto");
const session_dto_1 = require("../dtos/session.dto");
const authentication_service_1 = require("../services/implementations/authentication.service");
const local_auth_guard_1 = require("../passport/local-auth.guard");
const session_service_1 = require("../services/implementations/session.service");
const admin_dto_1 = require("../dtos/admin.dto");
const otp_dto_1 = require("../dtos/otp.dto");
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService, sessionService) {
        this.authenticationService = authenticationService;
        this.sessionService = sessionService;
    }
    async register(userDto) {
        return this.authenticationService.createUser(userDto);
    }
    async login(req) {
        return this.authenticationService.login(req);
    }
    async logout(sessionDto) {
        return this.authenticationService.logout(sessionDto?.session_id);
    }
    async checkEmailDuplicate(email) {
        return this.authenticationService.checkEmailDuplicate(email);
    }
    async checkForgetPasswordEmail(email) {
        return this.authenticationService.checkForgetPasswordEmail(email);
    }
    async checkUsernameDuplicate(username) {
        return this.authenticationService.checkUsernameDuplicate(username);
    }
    async checkSupplierStatus(username) {
        return this.authenticationService.checkSupplierStatus(username);
    }
    async getRejectionInfo(user_id) {
        return this.authenticationService.getRejectionInfo(user_id);
    }
    async getAppealInfo(user_id) {
        return this.authenticationService.getAppealInfo(user_id);
    }
    async Appeal(user_id, userDto) {
        return this.authenticationService.appealRegistration(user_id, userDto);
    }
    async getDetails(session_id) {
        return this.authenticationService.getUserDetailBySessionId(session_id);
    }
    async getProfileInfo(user_id) {
        return this.authenticationService.getProfileInfo(user_id);
    }
    async updateProfile(user_id, userDto) {
        return this.authenticationService.updateProfile(user_id, userDto);
    }
    async updatePassword(user_id, userDto) {
        return this.authenticationService.updatePassword(user_id, userDto);
    }
    async resetPassword(user_id, userDto) {
        return this.authenticationService.resetPassword(user_id, userDto);
    }
    async updateUserStatus(user_id, userDto) {
        return this.authenticationService.updateUserStatus(user_id, userDto);
    }
    async findAllPendingSuppliers() {
        return this.authenticationService.findAllPendingSuppliers();
    }
    async findAllRejectedSuppliers() {
        return this.authenticationService.findAllRejectedSuppliers();
    }
    async findAllApprovedSuppliers() {
        return this.authenticationService.findAllApprovedSuppliers();
    }
    async findSupplierById(user_id) {
        return this.authenticationService.findSupplierById(user_id);
    }
    async approveSupplierReviewStatus(user_id, supplierDto) {
        return this.authenticationService.approveSupplierReviewStatus(user_id, supplierDto);
    }
    async rejectSupplierReviewStatus(user_id, supplierDto) {
        return this.authenticationService.rejectSupplierReviewStatus(user_id, supplierDto);
    }
    async findAllAdmin() {
        return this.authenticationService.findAllAdmins();
    }
    async findAdminById(user_id) {
        return this.authenticationService.findAdminById(user_id);
    }
    async updateAdmin(user_id, adminDto) {
        return this.authenticationService.updateAdminById(user_id, adminDto);
    }
    async sendOtp(otpDto) {
        return this.authenticationService.sendOTP(otpDto);
    }
    async verifyOtp(otpDto, res) {
        return this.authenticationService.verifyOTP(otpDto, res);
    }
    async sendDeleteOtp(otpDto) {
        return this.authenticationService.sendDeleteOTP(otpDto);
    }
    async verifyDeleteOtp(otpDto, res) {
        return this.authenticationService.verifyDeleteOTP(otpDto, res);
    }
    async getEmail(user_id) {
        return this.authenticationService.getEmail(user_id);
    }
    async deleteAccount(user_id) {
        return this.authenticationService.deleteAccount(user_id);
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.SessionDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('check-email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "checkEmailDuplicate", null);
__decorate([
    (0, common_1.Get)('check-forget-password-email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "checkForgetPasswordEmail", null);
__decorate([
    (0, common_1.Get)('check-username'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "checkUsernameDuplicate", null);
__decorate([
    (0, common_1.Get)('check-status'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "checkSupplierStatus", null);
__decorate([
    (0, common_1.Get)('get-rejection-info'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getRejectionInfo", null);
__decorate([
    (0, common_1.Get)('get-appeal-info'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getAppealInfo", null);
__decorate([
    (0, common_1.Patch)('appeal'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "Appeal", null);
__decorate([
    (0, common_1.Get)('get-details'),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)('get-profile-info'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getProfileInfo", null);
__decorate([
    (0, common_1.Patch)('update-profile'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('update-password'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)('reset-password'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Patch)('user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Get)('pending-suppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "findAllPendingSuppliers", null);
__decorate([
    (0, common_1.Get)('rejected-suppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "findAllRejectedSuppliers", null);
__decorate([
    (0, common_1.Get)('approved-suppliers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "findAllApprovedSuppliers", null);
__decorate([
    (0, common_1.Get)('user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "findSupplierById", null);
__decorate([
    (0, common_1.Patch)('approve'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_dto_1.SupplierDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "approveSupplierReviewStatus", null);
__decorate([
    (0, common_1.Patch)('reject'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_dto_1.SupplierDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "rejectSupplierReviewStatus", null);
__decorate([
    (0, common_1.Get)('admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "findAdminById", null);
__decorate([
    (0, common_1.Patch)('update-admin'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Post)('send-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('send-delete-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "sendDeleteOtp", null);
__decorate([
    (0, common_1.Post)('verify-delete-otp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "verifyDeleteOtp", null);
__decorate([
    (0, common_1.Get)('get-email'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getEmail", null);
__decorate([
    (0, common_1.Patch)('delete-account'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "deleteAccount", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(authentication_service_1.AuthenticationService.name)),
    __param(1, (0, common_1.Inject)(session_service_1.SessionService.name)),
    __metadata("design:paramtypes", [Object, Object])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map