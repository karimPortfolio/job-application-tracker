import { DepartmentDocument } from 'src/departments/departments.schema';
import { Model } from 'mongoose';
import { CompanyDocument } from 'src/companies/company.schema';
import { JobDocument } from 'src/jobs/jobs.schema';
import { ApplicationDocument } from 'src/applications/applications.schema';
import { StatsResponse } from './types/dashboard.types';
import { DashboardUtils, MonthlyStats } from './utils/dashboard.utils';
export declare class DashboardService {
    private readonly departmentModel;
    private readonly companyModel;
    private readonly jobModel;
    private readonly applicationModel;
    private cache;
    private readonly dashboardUtils;
    constructor(departmentModel: Model<DepartmentDocument>, companyModel: Model<CompanyDocument>, jobModel: Model<JobDocument>, applicationModel: Model<ApplicationDocument>, cache: any, dashboardUtils: DashboardUtils);
    getDepartmentsStats(companyId: string): Promise<StatsResponse>;
    getJobsStats(companyId: string): Promise<StatsResponse>;
    getApplicationsStats(companyId: string): Promise<StatsResponse>;
    getMonthlyApplicationsStats(companyId: string, year: string): Promise<MonthlyStats[]>;
    getApplicationsStatsByJobs(companyId: string, year: string): Promise<{
        job: string;
        total: number;
    }[]>;
    getApplicationsStatsByCountries(companyId: string, year: string): Promise<{
        countries: {
            id: string;
            value: number;
        }[];
        total: number;
    }>;
    getApplicationsStatsByStatus(companyId: string, year: string): Promise<{
        status: string;
        total: number;
    }[]>;
    getApplicationsStatsByStages(companyId: string, year: string): Promise<{
        stage: string;
        total: number;
    }[]>;
    getApplicationsStatsByDepartments(companyId: string, year: string): Promise<{
        department: string;
        total: number;
    }[]>;
    getTopJobsByApplications(companyId: string, year: string): Promise<any>;
    private getCompanyOrThrow;
}
