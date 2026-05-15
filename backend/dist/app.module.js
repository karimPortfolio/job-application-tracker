"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const google_recaptcha_1 = require("@nestlab/google-recaptcha");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const companies_module_1 = require("./companies/companies.module");
const departments_module_1 = require("./departments/departments.module");
const redis_module_1 = require("./common/cache/redis.module");
const jobs_module_1 = require("./jobs/jobs.module");
const ai_module_1 = require("./ai/ai.module");
const applications_module_1 = require("./applications/applications.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const throttler_1 = require("@nestjs/throttler");
const throttler_storage_redis_1 = require("@nest-lab/throttler-storage-redis");
const profile_module_1 = require("./profile/profile.module");
const bullmq_1 = require("@nestjs/bullmq");
const notifications_module_1 = require("./notifications/notifications.module");
const mail_module_1 = require("./mail/mail.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const billing_module_1 = require("./billing/billing.module");
const stripe_module_1 = require("./shared/stripe.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: process.env.NODE_ENV === 'test'
                        ? process.env.MONGO_URI
                        : process.env.MONGO_URI,
                }),
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{ limit: 5, ttl: 60 }],
                storage: new throttler_storage_redis_1.ThrottlerStorageRedisService(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`),
            }),
            google_recaptcha_1.GoogleRecaptchaModule.forRoot({
                secretKey: process.env.RECAPTCHA_SECRET_KEY,
                response: (req) => req.headers['x-recaptcha-token'],
            }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST ?? 'localhost',
                    port: parseInt(process.env.REDIS_PORT ?? '6379'),
                },
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            redis_module_1.RedisCacheModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            companies_module_1.CompaniesModule,
            departments_module_1.DepartmentsModule,
            jobs_module_1.JobsModule,
            ai_module_1.AIModule,
            applications_module_1.ApplicationsModule,
            dashboard_module_1.DashboardModule,
            profile_module_1.ProfileModule,
            mail_module_1.MailModule,
            notifications_module_1.NotificationsModule,
            stripe_module_1.SharedStripeModule,
            billing_module_1.BillingModule,
        ],
        exports: [stripe_module_1.SharedStripeModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map