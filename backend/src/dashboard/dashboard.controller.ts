import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dasboard.service';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from 'src/common/guards/CompanyGuard';
import { StatsResponse } from './types/dashboard.types';
import { DashboardQueryDto } from './dashboard-query.dto';

@UseGuards(AuthGuard('jwt'), CompanyGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject()
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('departments/stats')
  public async getDepartmentsStats(@Req() req: any): Promise<StatsResponse> {
    const companyid = req.companyId;
    return this.dashboardService.getDepartmentsStats(companyid);
  }

  @Get('jobs/stats')
  public async getJobsStats(@Req() req: any): Promise<StatsResponse> {
    const companyid = req.companyId;
    return this.dashboardService.getJobsStats(companyid);
  }

  @Get('applications/stats')
  public async getApplicationsStats(@Req() req: any): Promise<StatsResponse> {
    const companyid = req.companyId;
    return this.dashboardService.getApplicationsStats(companyid);
  }

  @Get('applications/monthly-stats')
  public async getApplicationsMonthlyStats(
    @Query() query: DashboardQueryDto,
    @Req() req: any,
  ): Promise<any> {
    const companyId = req.companyId;
    const year = query.year || new Date().getFullYear().toString();
    return this.dashboardService.getMonthlyApplicationsStats(companyId, year);
  }

  @Get('applications/stats-by-jobs')
  public async getApplicationsStatsByJobs(
    @Req() req: any,
    @Query() query: DashboardQueryDto,
  ): Promise<any> {
    const companyid = req.companyId;
    const year = query.year || new Date().getFullYear().toString();
    return this.dashboardService.getApplicationsStatsByJobs(companyid, year);
  };

  @Get('applications/stats-by-countries')
  public async getApplicationsStatsByCountries(
    @Req() req: any,
    @Query() query: DashboardQueryDto,
  ): Promise<any> {
    const companyid = req.companyId;
    const year = query.year || new Date().getFullYear().toString();
    return this.dashboardService.getApplicationsStatsByCountries(companyid, year);
  }
}