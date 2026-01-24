import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { User, UserSchema } from '../users/user.schema'
import { Department, DepartmentSchema } from './departments.schema'
import { Company, CompanySchema } from 'src/companies/company.schema'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
    UsersModule,
  ],
  exports: [MongooseModule],
  providers: [DepartmentsService],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {}
