import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { Notification } from './notifications.schema';
export declare class NotificationsProcessor extends WorkerHost {
    private notificationModel;
    private readonly mailService;
    constructor(notificationModel: Model<Notification>, mailService: MailService);
    process(job: Job<any, any, string>): Promise<any>;
}
