import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CompaniesModule } from './companies/companies.module'
// import { JobsModule } from './jobs/jobs.module'
// import { ApplicationsModule } from './applications/applications.module'
import { RedisCacheModule } from './common/cache/redis.module'

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


    RedisCacheModule,

    AuthModule,
    UsersModule,
    CompaniesModule,
    // JobsModule,
    // ApplicationsModule,
  ],
})
export class AppModule {}
