import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/user.schema';
import { Company, CompanySchema } from '../companies/company.schema';
import { Job, JobSchema } from './jobs.schema';
import {
  Department,
  DepartmentSchema,
} from '../departments/departments.schema';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsCsvExporter } from './exporters/jobs-csv.exporter';
import { JobsXlsxExporter } from './exporters/jobs-xlsx.exporter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
      { name: Department.name, schema: DepartmentSchema },
    ]),
    UsersModule,
  ],
  exports: [MongooseModule],
  providers: [JobsService, JobsCsvExporter, JobsXlsxExporter],
  controllers: [JobsController],
})
export class JobsModule {}
