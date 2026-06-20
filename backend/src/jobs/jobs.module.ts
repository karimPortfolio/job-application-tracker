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
import { CompanyGuard } from '../common/guards/CompanyGuard';
import { PublicJobsController } from './public-jobs.controller';
import { SavedJobs, SavedJobsSchema } from './saved-jobs-schema';
import { OptionalAuthGuard } from 'src/common/guards/OptionalAuthGuard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: SavedJobs.name, schema: SavedJobsSchema },
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
      { name: Department.name, schema: DepartmentSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  exports: [MongooseModule, OptionalAuthGuard],
  providers: [JobsService, JobsCsvExporter, JobsXlsxExporter, CompanyGuard, OptionalAuthGuard],
  controllers: [JobsController, PublicJobsController],
})
export class JobsModule {}
