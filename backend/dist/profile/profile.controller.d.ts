import { ProfileService } from "./profile.service";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { PasswordUpdateDto } from "./dto/password-update.dto";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    updateProfile(user: {
        sub: string;
    }, body: ProfileUpdateDto, file?: Express.Multer.File): Promise<(import("../users/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updatePassword(user: {
        sub: string;
    }, body: PasswordUpdateDto): Promise<{
        message: string;
    }>;
}
