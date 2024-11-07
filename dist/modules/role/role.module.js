"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./services/implementations/role.service");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("./domain/schema/role.schema");
const role_repository_1 = require("./domain/repositories/role.repository");
const role_controller_1 = require("./controllers/role.controller");
let RoleModule = class RoleModule {
};
exports.RoleModule = RoleModule;
exports.RoleModule = RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema },
            ]),
        ],
        controllers: [role_controller_1.RoleController],
        exports: [role_service_1.RoleService.name],
        providers: [
            { provide: role_service_1.RoleService.name, useClass: role_service_1.RoleService },
            role_repository_1.RoleRepository,
        ],
    })
], RoleModule);
//# sourceMappingURL=role.module.js.map