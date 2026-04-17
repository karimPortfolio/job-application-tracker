import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';

import { Notification, NotificationSchema } from './notifications.schema';
import { NotificationsListener } from './notifications.listener';
import { NotificationsProcessor } from './notifications.processor';
import { MailModule } from '../mail/mail.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { User, UserSchema } from '../users/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),

    BullModule.registerQueue({
      name: 'notifications',
    }),

    MailModule
  ],
  providers: [
    NotificationsListener, 
    NotificationsProcessor,
    NotificationsService
  ],
  exports: [
    BullModule, 
  ],
  controllers: [NotificationsController]
})
export class NotificationsModule {}