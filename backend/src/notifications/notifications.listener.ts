import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsListener {
  constructor(@InjectQueue('notifications') private notificationQueue: Queue) {}

  @OnEvent('profile.password_updated')
  async handlePasswordUpdate(payload: any) {
    await this.notificationQueue.add('save-in-app', {
      userId: payload.user?._id,
      type: 'SECURITY_ALERT',
      data: {
        title: 'Password Changed',
        message: 'Your password was updated successfully.',
      },
    });

    await this.notificationQueue.add('send-email', {
      to: payload.user?.email,
      template: 'password-updated',
      subject: 'Security Alert: Password Changed',
      data: {
        APP_NAME: process.env.APP_NAME || 'Hirely',
      },
    });
  }

  @OnEvent('application.created')
  async handleApplicationCreate(payload: any) {
    console.log(payload);
    await this.notificationQueue.add('save-in-app', {
      userId: payload.user?._id,
      type: 'APPLICATION_RECEIVED',
      data: {
        title: 'New Application Submitted',
        message: `You have received a new application for the ${payload.jobTitle} position.`,
        linkUrl: `${process.env.FRONTEND_URL}/dashboard/applications/${payload.application._id}`,
      },
    });

    await this.notificationQueue.add('send-email', {
      to: payload.user?.email,
      template: 'application-received',
      subject: 'New Application Received',
      data: {
        APP_NAME: process.env.APP_NAME || 'Hirely',
        JOB_TITLE: payload.jobTitle,
        APPLICATION: payload.application,
        ACTION_URL: `${process.env.FRONTEND_URL}/dashboard/applications/${payload.application._id}`,
        ACTION_LABEL: 'Review Application',
      },
    });
  }
}
