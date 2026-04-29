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
exports.PasswordUpdateDto = void 0;
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../common/decorators/match.decorator");
class PasswordUpdateDto {
    currentPassword;
    newPassword;
    newPasswordConfirm;
}
exports.PasswordUpdateDto = PasswordUpdateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 0
    }),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, match_decorator_1.Match)('newPassword', { message: 'Passwords do not match' }),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "newPasswordConfirm", void 0);
//# sourceMappingURL=password-update.dto.js.map