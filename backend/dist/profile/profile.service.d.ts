import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { ProfileUpdateDto } from './dto/profile-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { PasswordUpdateDto } from './dto/password-update.dto';
import { S3Uploader } from 'src/common/utils/s3-uploader';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ProfileService {
    private readonly userModel;
    private readonly authService;
    private readonly s3Uploader;
    private eventEmitter;
    constructor(userModel: Model<User>, authService: AuthService, s3Uploader: S3Uploader, eventEmitter: EventEmitter2);
    updateProfile(user: {
        sub: string;
    }, body: ProfileUpdateDto, file?: Express.Multer.File): Promise<(User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updatePassword(user: {
        sub: string;
    }, body: PasswordUpdateDto): Promise<{
        message: string;
    }>;
    private uploadResumeToS3;
}
