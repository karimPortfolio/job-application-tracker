import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/user.schema';
import { Company, CompanySchema } from '../companies/company.schema';
import { ApplicationSchema, Application } from './applications.schema';
import { Job, JobSchema } from '../jobs/jobs.schema';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationsCsvExporter } from './exporters/applications-csv.exporter';
import { ApplicationsXlsxExporter } from './exporters/applications-xlsx.exporter';
import { S3Uploader } from '../common/utils/s3-uploader';
import { IsApplicationEmailUniqueConstraint } from '../common/decorators/is-application-email-uniqe.validator';
import { AIService } from '../ai/ai.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
      { name: Job.name, schema: JobSchema },
    ]),
    UsersModule,
  ],
  exports: [MongooseModule],
  providers: [
    ApplicationsService,
    AIService,
    ApplicationsCsvExporter,
    ApplicationsXlsxExporter,
    S3Uploader,
    IsApplicationEmailUniqueConstraint
  ],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
