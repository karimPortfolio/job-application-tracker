"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMailConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const mail_service_1 = require("../mail/mail.service");
let AuthMailConsumer = class AuthMailConsumer extends bullmq_1.WorkerHost {
    mailService;
    constructor(mailService) {
        super();
        this.mailService = mailService;
    }
    async process(job) {
        switch (job.name) {
            case 'send-reset-password-mail': {
                const to = job.data.to ?? '';
                const subject = job.data.subject ?? 'Reset your password';
                const html = job.data.html ?? 'reset-password';
                const data = job.data.data ?? {};
                await this.mailService.sendMail(to, subject, html, data);
                break;
            }
            case 'send-email-verification-mail': {
                const to = job.data.to ?? '';
                const subject = job.data.subject ?? 'Verify your email';
                const html = job.data.html ?? 'email-verification';
                const data = job.data.data ?? {};
                await this.mailService.sendMail(to, subject, html, data);
                break;
            }
        }
    }
};
exports.AuthMailConsumer = AuthMailConsumer;
exports.AuthMailConsumer = AuthMailConsumer = __decorate([
    (0, bullmq_1.Processor)('authMail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], AuthMailConsumer);
//# sourceMappingURL=auth-mail.processor.js.map