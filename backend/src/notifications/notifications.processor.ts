import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './notifications.schema';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private readonly mailService: MailService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'save-in-app':
        await this.notificationModel.create(job.data);
        //TODO: emit to Socket.io here to update the frontend!
        break;

      case 'send-email':
        const to = job.data.to;
        const subject = job.data.subject;
        const html = job.data.template;
        const data = job.data.data;

        await this.mailService.sendMail(to, subject, html, data);
        break;
    }
  }
}
