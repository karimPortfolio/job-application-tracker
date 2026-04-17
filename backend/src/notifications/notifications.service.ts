import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { PaginateModel } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';
import { Notification, NotificationDocument } from './notifications.schema';
import { NotificationQueryDto } from './dto/notification-query.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: PaginateModel<NotificationDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserNotifications(
    user: { sub: string },
    query: NotificationQueryDto,
  ) {
    const userFound = await this.getUserOrThrow(user.sub);

    return this.notificationModel.paginate(
      {
        userId: userFound.id,
      },
      {
        page: query.page || 1,
        limit: query.limit || 10,
        lean: true,
        leanWithVirtuals: true,
      } as any,
    );
  }

  async markAsRead(user: { sub: string }, notification: string) {
    const userFound = await this.getUserOrThrow(user.sub);

    const notificationToUpdate = await this.notificationModel.findOne({
      _id: notification,
      userId: userFound.id,
    });

    if (!notificationToUpdate) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationModel.updateOne(
      { _id: notificationToUpdate.id },
      { $set: { readAt: new Date() } },
    );

    return {
      message: 'Notification marked as read successfully',
    };
  }

  async markAllAsRead(user: { sub: string }) {
    const userFound = await this.getUserOrThrow(user.sub);

    await this.notificationModel.updateMany(
      { userId: userFound.id },
      { $set: { readAt: new Date() } },
    );

    return {
      message: 'All Notifications marked as read successfully',
    };
  }

  private async getUserOrThrow(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }
}
