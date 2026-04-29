import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import type { Cache } from 'cache-manager';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordReset } from './password-reset.schema';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleProfilePayload } from './google.strategy';
import { EmailVerification } from './email-verification.schema';
import { EmailVerificationDto } from './dto/email-verification.dto';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    private readonly passwordResetModel;
    private readonly emailVerificationModel;
    private readonly config;
    private cache;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, passwordResetModel: Model<PasswordReset>, emailVerificationModel: Model<EmailVerification>, config: ConfigService, cache: Cache);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
    handleGoogleLogin(profile: GoogleProfilePayload): Promise<{
        accessToken: string;
    }>;
    private signToken;
    sendResetPasswordEmail(dto: ForgotPasswordDto): Promise<void>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
    sendEmailVerificationLink(user: {
        sub: string;
    }): Promise<void>;
    verifyEmail(dto: EmailVerificationDto): Promise<void>;
    logout(token: string): Promise<void>;
    me(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    private renderTemplate;
}
