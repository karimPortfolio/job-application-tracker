"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bullmq_1 = require("@nestjs/bullmq");
const notifications_schema_1 = require("./notifications.schema");
const notifications_listener_1 = require("./notifications.listener");
const notifications_processor_1 = require("./notifications.processor");
const mail_module_1 = require("../mail/mail.module");
const notifications_controller_1 = require("./notifications.controller");
const notifications_service_1 = require("./notifications.service");
const user_schema_1 = require("../users/user.schema");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: notifications_schema_1.Notification.name, schema: notifications_schema_1.NotificationSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            bullmq_1.BullModule.registerQueue({
                name: 'notifications',
            }),
            mail_module_1.MailModule
        ],
        providers: [
            notifications_listener_1.NotificationsListener,
            notifications_processor_1.NotificationsProcessor,
            notifications_service_1.NotificationsService
        ],
        exports: [
            bullmq_1.BullModule,
        ],
        controllers: [notifications_controller_1.NotificationsController]
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map