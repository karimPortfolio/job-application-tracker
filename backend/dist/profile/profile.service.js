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
exports.ProfileService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const s3_uploader_1 = require("../common/utils/s3-uploader");
const event_emitter_1 = require("@nestjs/event-emitter");
let ProfileService = class ProfileService {
    userModel;
    authService;
    s3Uploader;
    eventEmitter;
    constructor(userModel, authService, s3Uploader, eventEmitter) {
        this.userModel = userModel;
        this.authService = authService;
        this.s3Uploader = s3Uploader;
        this.eventEmitter = eventEmitter;
    }
    async updateProfile(user, body, file) {
        const currentUser = await this.userModel.findById(user.sub).lean();
        if (!currentUser)
            throw new common_1.NotFoundException('User not found');
        let avatarUrl;
        if (file && this.s3Uploader.isS3Configured()) {
            avatarUrl = await this.uploadResumeToS3(user.sub, currentUser.email, file);
        }
        const updateData = { ...body };
        let shouldVerifyEmail = false;
        if (body.email && body.email !== currentUser.email) {
            updateData.emailVerifiedAt = null;
            shouldVerifyEmail = true;
        }
        if (avatarUrl) {
            updateData.avatarUrl = avatarUrl;
        }
        const updatedUser = await this.userModel
            .findByIdAndUpdate(user.sub, updateData, { new: true })
            .select('-password')
            .lean();
        if (shouldVerifyEmail) {
            this.authService.sendEmailVerificationLink(user);
        }
        return updatedUser;
    }
    async updatePassword(user, body) {
        const userId = user.sub;
        const currentUser = await this.userModel.findById(userId).lean();
        if (!currentUser)
            throw new common_1.NotFoundException('User not found');
        const isPasswordValid = await bcrypt_1.default.compare(body.currentPassword, currentUser.password);
        if (!isPasswordValid) {
            throw new common_1.UnprocessableEntityException({
                message: 'Validation failed',
                errors: [
                    {
                        field: 'currentPassword',
                        errors: ['The current password you entered is incorrect.'],
                    },
                ],
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(body.newPassword, 10);
        await this.userModel.updateOne({ _id: currentUser._id }, { $set: { password: hashedPassword } });
        this.eventEmitter.emit('profile.password_updated', {
            user: currentUser,
            timestamp: new Date()
        });
        return { message: 'Password updated successfully' };
    }
    async uploadResumeToS3(companyId, email, file) {
        return this.s3Uploader.upload({
            file,
            keyPrefix: `applications/resumes/${companyId}`,
            metadata: { email: email || '' },
            acl: 'private',
            errMessage: 'Resume is required and must be a valid file',
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService,
        s3_uploader_1.S3Uploader,
        event_emitter_1.EventEmitter2])
], ProfileService);
//# sourceMappingURL=profile.service.js.map