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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../users/user.schema");
const crypto_1 = require("crypto");
const password_reset_schema_1 = require("./password-reset.schema");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_verification_schema_1 = require("./email-verification.schema");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
let AuthService = class AuthService {
    userModel;
    jwtService;
    passwordResetModel;
    emailVerificationModel;
    authMailQueue;
    config;
    cache;
    constructor(userModel, jwtService, passwordResetModel, emailVerificationModel, authMailQueue, config, cache) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.passwordResetModel = passwordResetModel;
        this.emailVerificationModel = emailVerificationModel;
        this.authMailQueue = authMailQueue;
        this.config = config;
        this.cache = cache;
    }
    async register(dto) {
        const hash = await bcrypt_1.default.hash(dto.password, 10);
        const name = `${dto.first_name} ${dto.last_name}`;
        const user = await this.userModel.create({
            name,
            email: dto.email,
            password: hash,
            provider: 'local',
            role: dto.role || 'user'
        });
        return this.signToken(user);
    }
    async login(dto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user)
            throw new common_1.UnauthorizedException('Email or password does not match.');
        const match = await bcrypt_1.default.compare(dto.password, user.password);
        if (!match)
            throw new common_1.UnauthorizedException('Email or password does not match.');
        return this.signToken(user);
    }
    async handleGoogleLogin(profile) {
        const existing = await this.userModel.findOne({
            $or: [{ googleId: profile.googleId }, { email: profile.email }],
        });
        if (!existing) {
            const hashedPassword = await bcrypt_1.default.hash((0, crypto_1.randomUUID)(), 10);
            const user = await this.userModel.create({
                name: profile.name,
                email: profile.email,
                password: hashedPassword,
                provider: 'google',
                googleId: profile.googleId,
            });
            return this.signToken(user);
        }
        if (!existing.googleId) {
            existing.googleId = profile.googleId;
            existing.provider = 'google';
            await existing.save();
        }
        return this.signToken(existing);
    }
    signToken(user) {
        return {
            accessToken: this.jwtService.sign({
                sub: user._id.toString(),
                company: user.company,
            }),
        };
    }
    async sendResetPasswordEmail(dto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user)
            return;
        const token = (0, crypto_1.randomUUID)();
        const hashedToken = await bcrypt_1.default.hash(token, 10);
        await this.passwordResetModel.deleteMany({ email: dto.email });
        await this.passwordResetModel.create({
            email: dto.email,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        });
        const resetUrl = `${this.config.get('FRONTEND_URL')}/auth/reset-password?token=${token}&email=${dto.email}`;
        const appName = this.config.get('APP_NAME') || 'Hirely';
        await this.authMailQueue.add('send-reset-password-mail', {
            to: dto.email,
            subject: 'Reset your password',
            html: 'reset-password',
            data: {
                RESET_URL: resetUrl,
                APP_NAME: appName,
            },
        });
    }
    async resetPassword(dto) {
        const record = await this.passwordResetModel.findOne({
            email: dto.email,
            expiresAt: { $gt: new Date() },
        });
        if (!record) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        const tokenValid = await bcrypt_1.default.compare(dto.token, record.token);
        if (!tokenValid) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        await this.userModel.updateOne({ email: dto.email }, { password: await bcrypt_1.default.hash(dto.password, 10) });
        await record.deleteOne();
    }
    async sendEmailVerificationLink(user) {
        const userRecord = await this.userModel.findById(user.sub);
        if (!userRecord) {
            throw new common_1.BadRequestException('User not found.');
        }
        if (userRecord.emailVerifiedAt) {
            throw new common_1.BadRequestException('Email is already verified.');
        }
        const token = (0, crypto_1.randomUUID)();
        const hashedToken = await bcrypt_1.default.hash(token, 10);
        await this.emailVerificationModel.deleteMany({ email: userRecord.email });
        await this.emailVerificationModel.create({
            email: userRecord.email,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        const verifyUrl = `${this.config.get('FRONTEND_URL')}/auth/verify-email?token=${token}&email=${userRecord.email}`;
        const appName = this.config.get('APP_NAME') || 'Hirely';
        const cloudfrontUrl = this.config.get('AWS_CLOUDFRONT_URL') || '';
        await this.authMailQueue.add('send-email-verification-mail', {
            to: userRecord.email,
            subject: 'Verify your email',
            html: 'email-verification',
            data: {
                VERIFY_URL: verifyUrl,
                APP_NAME: appName,
                CLOUDFRONT_URL: cloudfrontUrl,
            },
        });
    }
    async verifyEmail(dto) {
        const record = await this.emailVerificationModel.findOne({
            email: dto.email,
            expiresAt: { $gt: new Date() },
        });
        if (!record) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        const tokenValid = await bcrypt_1.default.compare(dto.token, record.token);
        if (!tokenValid) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        await this.userModel.updateOne({ email: dto.email }, { emailVerifiedAt: new Date() });
        await record.deleteOne();
    }
    async logout(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded?.exp)
            return;
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) {
            await this.cache.set(`bl:${token}`, true, ttl);
        }
    }
    async me(userId) {
        return this.userModel
            .findById(userId)
            .select('-password -provider')
            .populate('company', '-stripeSubscriptionId -stripeCustomerId -adminEmail');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(password_reset_schema_1.PasswordReset.name)),
    __param(3, (0, mongoose_1.InjectModel)(email_verification_schema_1.EmailVerification.name)),
    __param(4, (0, bullmq_2.InjectQueue)('authMail')),
    __param(6, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model,
        bullmq_1.Queue,
        config_1.ConfigService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map