import { Injectable, NotFoundException } from '@nestjs/common';
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

    await this.userModel.findByIdAndUpdate(
      currentUser._id,
      {
        preferences: {
          theme: dto.theme,
        },
      },
      {
        new: true,
      },
    );

    return { message: 'Preferences updated successfully' };
  }
}
