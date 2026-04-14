import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { ProfileUpdateDto } from './dto/profile-update.dto';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PasswordUpdateDto } from './dto/password-update.dto';
import bcrypt from 'bcrypt';
import { S3Uploader } from 'src/common/utils/s3-uploader';

export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
    private readonly s3Uploader: S3Uploader,
  ) {}

  async updateProfile(
    user: { sub: string },
    body: ProfileUpdateDto,
    file?: Express.Multer.File,
  ) {
    const currentUser = await this.userModel.findById(user.sub).lean();
    if (!currentUser) throw new NotFoundException('User not found');

    let avatarUrl: string | undefined;
    if (file && this.s3Uploader.isS3Configured()) {
      avatarUrl = await this.uploadResumeToS3(user.sub, currentUser.email, file);
    }

    const updateData: any = { ...body };
    let shouldVerifyEmail: boolean = false;

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

  async updatePassword(user: { sub: string }, body: PasswordUpdateDto) {
    const currentUser = await this.userModel.findById(user.sub).lean();
    if (!currentUser) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(
      body.currentPassword,
      currentUser.password,
    );

    if (!isPasswordValid) {
      throw new UnprocessableEntityException({
        message: 'Validation failed',
        errors: [
          {
            field: 'currentPassword',
            errors: ['The current password you entered is incorrect.'],
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    await this.userModel.updateOne(
      { _id: currentUser._id },
      { $set: { password: hashedPassword } },
    );

    return { message: 'Password updated successfully' };
  }

  private async uploadResumeToS3(
    companyId: string,
    email: string | undefined,
    file: Express.Multer.File,
  ) {
    return this.s3Uploader.upload({
      file,
      keyPrefix: `applications/resumes/${companyId}`,
      metadata: { email: email || '' },
      acl: 'private',
      errMessage: 'Resume is required and must be a valid file',
    });
  }
}
