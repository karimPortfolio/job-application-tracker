import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';
import { JobQueryDto } from './dto/job-query.dto';
import { CompanyGuard } from '../common/guards/CompanyGuard';
import { CreateJobDto } from './dto/create-job.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateJobDto } from './dto/update-job.dto';
import type { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { JobResponseDto } from './dto/job-response.dto';
import { UpdateJobStatusDto } from './dto/update-job-status.dto';
import { Department } from '../departments/departments.schema';
import { GenerateJobDto } from './dto/generate-job.dto';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'), CompanyGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getCompanyJobs(@Req() req: any, @Query() query: JobQueryDto) {
    const companyId = req.user.company;
    
    const result = await this.jobsService.getCompanyJobs(companyId, query);
    return {
      ...result,
      docs: plainToInstance(JobResponseDto, result.docs, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get('export')
  async exportJobs(
    @Query('format') format: 'csv' | 'xlsx' = 'csv',
    @Req() req: any,
    @Query() query: JobQueryDto,
    @Res() res: Response,
  ) {
    const companyId = req.user.company;
    const stream = await this.jobsService.exportJobs(companyId, format, query);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="jobs.${format}"`,
    );

    res.setHeader(
      'Content-Type',
      format === 'csv'
        ? 'text/csv'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    stream.pipe(res);
  }

  @Post()
  async createJob(
    @CurrentUser() user: { sub: string },
    @Req() req: any,
    @Body() dto: CreateJobDto,
  ) {
    const companyId = req.user.company;
    return this.jobsService.createJob(companyId, user, dto);
  }

  @Post('generate-description')
  async generateJobDescription(@Body() dto: GenerateJobDto) {
    return this.jobsService.getGeneratedJobDescription(dto);
  }

  @Get('departments')
  async getCompanyDepartments(@Req() req: any): Promise<Department[]> {
    const companyId = req.user.company;
    return this.jobsService.getCompanyDepartments(companyId);
  }

  @Get(':id')
  async getJobById(@Req() req: any, @Param('id') jobId: string) {
    const companyId = req.user.company;
    return this.jobsService.getJobById(jobId, companyId);
  }

  @Patch(':id')
  async updateJob(
    @Req() req: any,
    @Param('id') jobId: string,
    @Body() dto: UpdateJobDto,
  ) {
    const companyId = req.user.company;
    return this.jobsService.updateJob(jobId, companyId, dto);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string, @Req() req: any) {
    const companyId = req.user.company;
    return this.jobsService.deleteJob(id, companyId);
  }

  @Patch(':id/increment-applications')
  async incrementApplicationsCount(@Param('id') jobId: string) {
    await this.jobsService.incrementApplicationsCount(jobId);
    return { message: 'Applications count incremented' };
  }

  @Patch(':id/increment-views')
  async incrementViewsCount(@Param('id') jobId: string) {
    await this.jobsService.incrementViewsCount(jobId);
    return { message: 'Views count incremented' };
  }

  @Patch(':id/status')
  async updateJobStatus(
    @Req() req: any,
    @Param('id') jobId: string,
    @Body() dto: UpdateJobStatusDto,
  ) {
    const companyId = req.user.company;
    await this.jobsService.updateJobStatus(jobId, companyId, dto);
    return { message: 'Job status updated successfully' };
  }
}
