import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from './company.schema'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { UsersModule } from '../users/users.module'
import { User, UserSchema } from '../users/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
  ],
  exports: [MongooseModule],
  providers: [CompaniesService],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
