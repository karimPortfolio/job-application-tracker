import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { User, UserSchema } from '../users/user.schema'
import { Department, DepartmentSchema } from './departments.schema'
import { Company, CompanySchema } from '../companies/company.schema'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'
import { Job, JobSchema } from '../jobs/jobs.schema'
import { DepartmentsCsvExporter } from './exporters/departments-csv.exporter'
import { DepartmentsXlsxExporter } from './exporters/departments-xlsx.exporter'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
      { name: Job.name, schema: JobSchema },
    ]),
    UsersModule,
  ],
  exports: [MongooseModule],
  providers: [DepartmentsService, DepartmentsXlsxExporter, DepartmentsCsvExporter],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {}
