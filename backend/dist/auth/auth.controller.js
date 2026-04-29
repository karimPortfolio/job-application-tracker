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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const google_auth_guard_1 = require("./google-auth.guard");
const email_verification_dto_1 = require("./dto/email-verification.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto, clientType, res) {
        const { accessToken } = await this.authService.register(dto);
        if (clientType === 'mobile') {
            return { accessToken };
        }
        res.cookie(process.env.COOKIE_NAME || 'access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return { message: 'Registered successfully' };
    }
    async login(dto, clientType, res) {
        const { accessToken } = await this.authService.login(dto);
        if (clientType === 'mobile') {
            return { accessToken };
        }
        res.cookie(process.env.COOKIE_NAME || 'access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return { message: 'Logged in successfully' };
    }
    async googleAuth() {
    }
    async googleAuthRedirect(req, clientType, res) {
        const { accessToken } = await this.authService.handleGoogleLogin(req.user);
        if (clientType === 'mobile') {
            return { accessToken };
        }
        res.cookie(process.env.COOKIE_NAME || 'access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
    }
    async logout(req, res) {
        const cookieName = process.env.COOKIE_NAME || 'access_token';
        const token = req.cookies?.[cookieName] || req.headers.authorization?.split(' ')[1];
        if (token) {
            await this.authService.logout(token);
        }
        res.clearCookie(cookieName);
        return { message: 'Logged out successfully' };
    }
    me(user) {
        return this.authService.me(user.sub);
    }
    async forgotPassword(dto) {
        await this.authService.sendResetPasswordEmail(dto);
        return {
            message: 'If the email exists, a reset link has been sent.',
        };
    }
    async resetPassword(dto) {
        await this.authService.resetPassword(dto);
        return {
            message: 'Password reset successfully',
        };
    }
    async resendVerification(user) {
        await this.authService.sendEmailVerificationLink(user);
        return {
            message: 'If the email exists, a verification link has been sent.',
        };
    }
    async verifyEmail(body) {
        await this.authService.verifyEmail(body);
        return { message: 'Email verified successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-client-type')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-client-type')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('x-client-type')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('resend-verification'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerification", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_verification_dto_1.EmailVerificationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({
        path: 'auth',
        version: common_1.VERSION_NEUTRAL,
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map