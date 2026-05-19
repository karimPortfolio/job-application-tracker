import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Patch, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { PasswordUpdateDto } from "./dto/password-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { CompanyGuard } from "src/common/guards/CompanyGuard";
import { EmailVerifiedGuard } from "src/auth/email-verified.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('profile')
@UseGuards(JwtAuthGuard, EmailVerifiedGuard, CompanyGuard)
export class ProfileController {
    constructor (
        private readonly profileService: ProfileService,
    ) {}

    @Patch()
    @UseInterceptors(FileInterceptor('avatar', { storage: memoryStorage() }))
    async updateProfile(
        @CurrentUser() user: { sub: string },
        @Body() body: ProfileUpdateDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
                    new FileTypeValidator({ fileType: 'image/*' }),
                ],
                fileIsRequired: false
            }),
        )
        file?: Express.Multer.File,
    ) {
        return await this.profileService.updateProfile(user, body, file);
    }

    @Patch('password')
    async updatePassword(
        @CurrentUser() user: { sub: string },
        @Body() body: PasswordUpdateDto
    ) {
        return await this.profileService.updatePassword(user, body);
    }
}
