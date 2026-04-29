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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const mongoose_1 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const mongoose_2 = require("@nestjs/mongoose");
const notifications_schema_1 = require("./notifications.schema");
let NotificationsProcessor = class NotificationsProcessor extends bullmq_1.WorkerHost {
    notificationModel;
    mailService;
    constructor(notificationModel, mailService) {
        super();
        this.notificationModel = notificationModel;
        this.mailService = mailService;
    }
    async process(job) {
        switch (job.name) {
            case 'save-in-app':
                await this.notificationModel.create(job.data);
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
};
exports.NotificationsProcessor = NotificationsProcessor;
exports.NotificationsProcessor = NotificationsProcessor = __decorate([
    (0, bullmq_1.Processor)('notifications'),
    __param(0, (0, mongoose_2.InjectModel)(notifications_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mail_service_1.MailService])
], NotificationsProcessor);
//# sourceMappingURL=notifications.processor.js.map