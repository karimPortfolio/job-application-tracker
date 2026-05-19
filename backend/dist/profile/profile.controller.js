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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const profile_update_dto_1 = require("./dto/profile-update.dto");
const password_update_dto_1 = require("./dto/password-update.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const email_verified_guard_1 = require("../auth/email-verified.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProfileController = class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async updateProfile(user, body, file) {
        return await this.profileService.updateProfile(user, body, file);
    }
    async updatePassword(user, body) {
        return await this.profileService.updatePassword(user, body);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_update_dto_1.ProfileUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('password'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, password_update_dto_1.PasswordUpdateDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updatePassword", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, email_verified_guard_1.EmailVerifiedGuard, CompanyGuard_1.CompanyGuard),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map