import { DashboardService } from './dasboard.service';
import { StatsResponse } from './types/dashboard.types';
import { DashboardQueryDto } from './dashboard-query.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDepartmentsStats(req: any): Promise<StatsResponse>;
    getJobsStats(req: any): Promise<StatsResponse>;
    getApplicationsStats(req: any): Promise<StatsResponse>;
    getApplicationsMonthlyStats(query: DashboardQueryDto, req: any): Promise<any>;
    getApplicationsStatsByJobs(req: any, query: DashboardQueryDto): Promise<any>;
    getApplicationsStatsByCountries(req: any, query: DashboardQueryDto): Promise<any>;
    getApplicationsStatsByStatus(req: any, query: DashboardQueryDto): Promise<any>;
    getApplicationsStatsByStages(req: any, query: DashboardQueryDto): Promise<any>;
    getApplicationsStatsByDepartments(req: any, query: DashboardQueryDto): Promise<any>;
    getTopJobsByApplications(req: any, query: DashboardQueryDto): Promise<any>;
}
