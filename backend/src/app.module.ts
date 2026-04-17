import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CompaniesModule } from './companies/companies.module'
import { DepartmentsModule } from './departments/departments.module'
import { RedisCacheModule } from './common/cache/redis.module'
import { JobsModule } from './jobs/jobs.module'
import { AIModule } from './ai/ai.module'
import { ApplicationsModule } from './applications/applications.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { ProfileModule } from './profile/profile.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsModule } from './notifications/notifications.module';
import { MailModule } from './mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI
            : process.env.MONGO_URI,
      }),
    }),

    ThrottlerModule.forRoot({
      throttlers: [{ limit: 5, ttl: seconds(60)}],
      storage: new ThrottlerStorageRedisService(`redis://ats-redis:${process.env.REDIS_PORT || 6379}`),
    }),

     GoogleRecaptchaModule.forRoot({
      secretKey: process.env.RECAPTCHA_SECRET_KEY,
      response: (req) => req.headers['x-recaptcha-token'],
    }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
      },
    }),

    EventEmitterModule.forRoot(),

    RedisCacheModule,

    AuthModule,
    UsersModule,
    CompaniesModule,
    DepartmentsModule,
    JobsModule,
    AIModule,
    ApplicationsModule,
    DashboardModule,
    ProfileModule,
    MailModule,
    NotificationsModule,
  ],
})
export class AppModule {}
