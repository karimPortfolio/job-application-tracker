import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';
import { JobQueryDto } from './dto/job-query.dto';
import { CompanyGuard } from '../common/guards/CompanyGuard';
import { CreateJobDto } from './dto/create-job.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateJobDto } from './dto/update-job.dto';
import type { Response } from 'express';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'), CompanyGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getCompanyJobs(
    @Req() req: any,
    @Query() query: JobQueryDto,
  ) {
    const companyId = req.user.company;

    return this.jobsService.getCompanyJobs(companyId, query);
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

  @Get(':id')
  async getJobById(
    @Req() req: any,
    @Param('id') jobId: string,
  ) {
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
  async deleteJob(
    @Req() req: any,
    @Param('id') jobId: string,
  ) {
    const companyId = req.user.company;
    return this.jobsService.deleteJob(jobId, companyId);
  }

  @Patch(':id/increment-applications')
  async incrementApplicationsCount(
    @Req() req: any,
    @Param('id') jobId: string,
  ) {
    const companyId = req.user.company;
    return this.jobsService.incrementApplicationsCount(jobId, companyId);
  }

  @Patch(':id/increment-views')
  async incrementViewsCount(
    @Req() req: any,
    @Param('id') jobId: string,
  ) {
    const companyId = req.user.company;
    return this.jobsService.incrementViewsCount(jobId, companyId);
  }
}