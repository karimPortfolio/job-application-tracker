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

    RedisCacheModule,

    AuthModule,
    UsersModule,
    CompaniesModule,
    DepartmentsModule,
    JobsModule,
    AIModule,
    ApplicationsModule,
    DashboardModule,
    ProfileModule
  ],
})
export class AppModule {}
