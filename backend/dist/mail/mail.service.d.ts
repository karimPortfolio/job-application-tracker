export declare class MailService {
    private transporter;
    private readonly logger;
    constructor();
    private compileTemplate;
    sendMail(to: string, subject: string, html: string, data: any): Promise<any>;
    sendSecurityAlert(email: string, message: string): Promise<any>;
}
