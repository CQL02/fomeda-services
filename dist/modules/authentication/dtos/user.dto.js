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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const class_validator_1 = require("class-validator");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The fullname cannot be empty' }),
    __metadata("design:type", String)
], UserDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The username cannot be empty' }),
    (0, class_validator_1.MinLength)(6, { message: 'The username cannot be less than 6 characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'The username cannot be more than 20 characters' }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The email cannot be empty' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], UserDto.prototype, "email_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The password cannot be empty' }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The type cannot be empty' }),
    __metadata("design:type", String)
], UserDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The is_active address cannot be empty' }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The role_id cannot be empty' }),
    __metadata("design:type", String)
], UserDto.prototype, "role_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "new_password", void 0);
//# sourceMappingURL=user.dto.js.map