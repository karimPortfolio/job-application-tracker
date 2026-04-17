import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });
  }

  /**
   * Helper method to read an HTML file and inject dynamic data
   *
   * @param templateName the template name
   * @param context data to pass to the template
   */
  private async compileTemplate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<string> {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'mail',
      'templates',
      `${templateName}.hbs`,
    );

    const templateHtml = await fs.readFile(templatePath, 'utf8');

    const template = handlebars.compile(templateHtml);

    return template(context);
  }

  async sendMail(to: string, subject: string, html: string, data: any) {
    try {
      const compiledHtml = await this.compileTemplate(html, data);
      const info = await this.transporter.sendMail({
        from: '"Intevio Team" <noreply@intevio.com>',
        to,
        subject,
        html: compiledHtml,
      });
      this.logger.log(
        `Email sent successfully to ${to}. Message ID: ${info.messageId}`,
      );
      return info;
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${to}`, error.stack);
      throw error;
    }
  }

  /**
   * Specific method for Security Alerts
   *
   * @param email string
   * @param message string
   */
  async sendSecurityAlert(email: string, message: string) {
    return this.sendMail(
      email,
      'Security Alert: Your Account',
      'security-alert',
      { message },
    );
  }
}
