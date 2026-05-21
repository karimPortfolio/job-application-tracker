import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Model } from 'mongoose';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updatePreferences(dto: UpdatePreferencesDto, user: { sub: string }) {
    const currentUser = await this.userModel.findById(user.sub).lean();
    if (!currentUser) throw new NotFoundException('User not found');

    const updatePayload: Record<string, any> = {};

    if (dto.theme) {
      updatePayload['preferences.theme'] = dto.theme;
    }

    if (dto.notifications) {
      Object.keys(dto.notifications).forEach((key) => {
        if (dto.notifications?.[key] !== undefined) {
          updatePayload[`preferences.notifications.${key}`] =
            dto.notifications[key];
        }
      });
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException(
        'No valid preference properties provided for update',
      );
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      currentUser._id,
      { $set: updatePayload },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User profile configurations not found');
    }

    return { message: 'Preferences updated successfully' };
  }
}
