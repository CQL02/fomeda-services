"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_schema_1 = require("./domain/schema/admin.schema");
const supplier_schema_1 = require("./domain/schema/supplier.schema");
const user_schema_1 = require("./domain/schema/user.schema");
const otp_schema_1 = require("./domain/schema/otp.schema");
const session_schema_1 = require("./domain/schema/session.schema");
const admin_repository_1 = require("./domain/repositories/admin.repository");
const supplier_repository_1 = require("./domain/repositories/supplier.repository");
const user_repository_1 = require("./domain/repositories/user.repository");
const otp_repository_1 = require("./domain/repositories/otp.repository");
const authentication_controller_1 = require("./controllers/authentication.controller");
const authentication_service_1 = require("./services/implementations/authentication.service");
const session_service_1 = require("./services/implementations/session.service");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./passport/local.strategy");
const session_serializer_1 = require("./passport/session.serializer");
const schedule_1 = require("@nestjs/schedule");
const role_module_1 = require("../role/role.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./passport/jwt.strategy");
const mailer_module_1 = require("../mailer/mailer.module");
let AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule;
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: admin_schema_1.Admin.name, schema: admin_schema_1.AdminSchema },
                { name: supplier_schema_1.Supplier.name, schema: supplier_schema_1.SupplierSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: otp_schema_1.Otp.name, schema: otp_schema_1.OtpSchema },
                { name: 'Session', schema: session_schema_1.SessionSchema },
            ]),
            role_module_1.RoleModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'jwt-secret-key',
                signOptions: { expiresIn: '2h' },
            }),
            mailer_module_1.MailerModule,
            passport_1.PassportModule.register({ session: true }),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        exports: [authentication_service_1.AuthenticationService.name, session_service_1.SessionService.name],
        providers: [
            { provide: authentication_service_1.AuthenticationService.name, useClass: authentication_service_1.AuthenticationService },
            { provide: session_service_1.SessionService.name, useClass: session_service_1.SessionService },
            admin_repository_1.AdminRepository, supplier_repository_1.SupplierRepository, user_repository_1.UserRepository, otp_repository_1.OtpRepository, local_strategy_1.LocalStrategy, session_serializer_1.SessionSerializer, jwt_strategy_1.JwtStrategy
        ],
    })
], AuthenticationModule);
//# sourceMappingURL=authentication.module.js.map