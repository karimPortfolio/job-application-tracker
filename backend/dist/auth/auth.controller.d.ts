import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { Response } from 'express';
import type { Request } from 'express';
import type { GoogleProfilePayload } from './google.strategy';
import { EmailVerificationDto } from './dto/email-verification.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, clientType: string, res: Response): Promise<{
        accessToken: string;
        message?: undefined;
    } | {
        message: string;
        accessToken?: undefined;
    }>;
    login(dto: LoginDto, clientType: string, res: Response): Promise<{
        accessToken: string;
        message?: undefined;
    } | {
        message: string;
        accessToken?: undefined;
    }>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: Request & {
        user: GoogleProfilePayload;
    }, clientType: string, res: Response): Promise<void | {
        accessToken: string;
    }>;
    logout(req: any, res: Response): Promise<{
        message: string;
    }>;
    me(user: any): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../users/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    resendVerification(user: any): Promise<{
        message: string;
    }>;
    verifyEmail(body: EmailVerificationDto): Promise<{
        message: string;
    }>;
}
