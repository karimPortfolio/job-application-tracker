import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from '../mail/mail.service';

@Processor('authMail')
export class AuthMailConsumer extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job): Promise<any> {
    switch (job.name) {
      case 'send-reset-password-mail': {
        const to = job.data.to ?? '';
        const subject = job.data.subject ?? 'Reset your password';
        const html = job.data.html ?? 'reset-password';
        const data = job.data.data ?? {};
        await this.mailService.sendMail(
          to,
          subject,
          html,
          data,
        );
        break;
      }
      
      case 'send-email-verification-mail': {
        const to = job.data.to ?? '';
        const subject = job.data.subject ?? 'Verify your email';
        const html = job.data.html ?? 'email-verification';
        const data = job.data.data ?? {};

        await this.mailService.sendMail(
          to,
          subject,
          html,
          data,
        );
        break;
      }
    }
  }
}
