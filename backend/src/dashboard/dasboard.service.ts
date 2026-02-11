import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  Department,
  DepartmentDocument,
} from 'src/departments/departments.schema';
import { Model, Types } from 'mongoose';
import { Company, CompanyDocument } from 'src/companies/company.schema';
import { Job, JobDocument } from 'src/jobs/jobs.schema';
import {
  Application,
  ApplicationDocument,
} from 'src/applications/applications.schema';
import { InjectModel } from '@nestjs/mongoose';
import { StatsResponse } from './types/dashboard.types';
import { DashboardUtils, MonthlyStats } from './utils/dashboard.utils';
import {
  APPLICATION_STAGES,
  APPLICATION_STATUSES,
} from 'src/applications/constants/applications-constants';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(Job.name)
    private readonly jobModel: Model<JobDocument>,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
    @Inject('CACHE_MANAGER') private cache: any,
    @Inject(DashboardUtils) private readonly dashboardUtils: DashboardUtils,
  ) {}

  public async getDepartmentsStats(companyId: string): Promise<StatsResponse> {
    const company = await this.getCompanyOrThrow(companyId);

    const cacheKey = `dashboard:departmentsTotal:${companyId}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const total = await this.departmentModel.countDocuments({
      company: company,
    });

    const currentMonthTotal = await this.dashboardUtils.currentMonthTotal(
      company,
      this.departmentModel,
    );
    const lastMonthTotal = await this.dashboardUtils.lastMonthTotal(
      company,
      this.departmentModel,
    );
    const monthsDiff = this.dashboardUtils.calculateDiff(
      currentMonthTotal,
      lastMonthTotal,
    );
    await this.cache.set(cacheKey, { total, monthsDiff }, { ttl: 300 });
    return {
      total,
      monthsDiff,
    };
  }

  public async getJobsStats(companyId: string): Promise<StatsResponse> {
    const company = await this.getCompanyOrThrow(companyId);

    const cacheKey = `dashboard:jobsTotal:${companyId}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    const total = await this.jobModel.countDocuments({
      company: company,
    });

    const currentMonthTotal = await this.dashboardUtils.currentMonthTotal(
      company,
      this.jobModel,
    );
    const lastMonthTotal = await this.dashboardUtils.lastMonthTotal(
      company,
      this.jobModel,
    );
    const monthsDiff = this.dashboardUtils.calculateDiff(
      currentMonthTotal,
      lastMonthTotal,
    );

    await this.cache.set(cacheKey, { total, monthsDiff }, { ttl: 300 });

    return {
      total,
      monthsDiff,
    };
  }

  public async getApplicationsStats(companyId: string): Promise<StatsResponse> {
    const company = await this.getCompanyOrThrow(companyId);

    const cacheKey = `dashboard:applicationsTotal:${companyId}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    const total = await this.applicationModel.countDocuments({
      company: company,
    });

    const currentMonthTotal = await this.dashboardUtils.currentMonthTotal(
      company,
      this.applicationModel,
    );
    const lastMonthTotal = await this.dashboardUtils.lastMonthTotal(
      company,
      this.applicationModel,
    );
    const monthsDiff = this.dashboardUtils.calculateDiff(
      currentMonthTotal,
      lastMonthTotal,
    );

    await this.cache.set(cacheKey, { total, monthsDiff }, { ttl: 300 });

    return {
      total,
      monthsDiff,
    };
  }

  public async getMonthlyApplicationsStats(
    companyId: string,
    year: string,
  ): Promise<MonthlyStats[]> {
    const company = await this.getCompanyOrThrow(companyId);
    const cacheKey = `dashboard:monthlyApplications:${companyId}:${year}`;
    const cachedValue = await this.cache.get(cacheKey);

    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const monthlyStats = await this.dashboardUtils.getTotalsByYearPeriod(
      year,
      company,
      this.applicationModel,
    );

    await this.cache.set(cacheKey, monthlyStats, { ttl: 300 });

    return monthlyStats;
  }

  public async getApplicationsStatsByJobs(
    companyId: string,
    year: string,
  ): Promise<{ job: string; total: number }[]> {
    const company = await this.getCompanyOrThrow(companyId);
    const cacheKey = `dashboard:applicationsByJobs:${companyId}:${year}`;
    const cachedValue = await this.cache.get(cacheKey);

    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const stats = await this.applicationModel.aggregate([
      {
        $match: {
          company: company,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      { $group: { _id: '$job', total: { $sum: 1 } } },
      {
        $addFields: {
          jobId: { $toObjectId: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $addFields: {
          jobDetails: { $arrayElemAt: ['$jobDetails', 0] },
        },
      },
      {
        $project: {
          job: '$jobDetails.title',
          total: 1,
          _id: 0,
        },
      },
    ]);

    await this.cache.set(cacheKey, stats, { ttl: 300 });
    return stats;
  }

  public async getApplicationsStatsByCountries(
    companyId: string,
    year: string,
  ): Promise<{ countries: { id: string; value: number }[]; total: number }> {
    const company = await this.getCompanyOrThrow(companyId);
    const cacheKey = `dashboard:applicationsByCountries:${companyId}:${year}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const results = await this.dashboardUtils.getTotalsByCountries(
      company,
      this.applicationModel,
      year,
    );

    await this.cache.set(cacheKey, results, { ttl: 300 });

    return results;
  }

  public async getApplicationsStatsByStatus(
    companyId: string,
    year: string,
  ): Promise<{ status: string; total: number }[]> {
    const company = await this.getCompanyOrThrow(companyId);
    const cacheKey = `dashboard:applicationsByStatus:${companyId}:${year}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const stats = await this.applicationModel.aggregate([
      {
        $match: {
          company: company,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      { $group: { _id: '$status', total: { $sum: 1 } } },
      {
        $project: {
          status: '$_id',
          total: 1,
          _id: 0,
        },
      },
    ]);

    const statusMap = Object.fromEntries(
      APPLICATION_STATUSES.map((s) => [s.value, s.label]),
    );

    const results = stats.map((i) => {
      return {
        status: statusMap[i.status] || i.status,
        total: i.total,
      };
    });

    await this.cache.set(cacheKey, results, { ttl: 300 });

    return results;
  }

  public async getApplicationsStatsByStages(
    companyId: string,
    year: string,
  ): Promise<{ stage: string; total: number }[]> {
    const company = await this.getCompanyOrThrow(companyId);
    const cacheKey = `dashboard:applicationsByStages:${companyId}:${year}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const stats = await this.applicationModel.aggregate([
      {
        $match: {
          company: company,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      { $group: { _id: '$stage', total: { $sum: 1 } } },
      {
        $project: {
          stage: '$_id',
          total: 1,
          _id: 0,
        },
      },
    ]);

    const stagesMap = Object.fromEntries(
      APPLICATION_STAGES.map((s) => [s.value, s.label]),
    );

    const results = stats.map((i) => {
      return {
        stage: stagesMap[i.stage] || i.stage,
        total: i.total,
      };
    });

    await this.cache.set(cacheKey, results, { ttl: 300 });

    return results;
  }

  public async getApplicationsStatsByDepartments(
    companyId: string,
    year: string,
  ): Promise<{ department: string; total: number }[]> {
    const company = await this.getCompanyOrThrow(companyId);
    const cacheKey = `dashboard:applicationsByDepartments:${companyId}:${year}`;
    const cachedValue = await this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

     const stats = await this.applicationModel.aggregate([
      {
        $match: {
          company: company, // company stored as string in application
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $addFields: {
          jobId: {
            $cond: {
              if: { $eq: [{ $type: '$job' }, 'objectId'] },
              then: '$job',
              else: { $toObjectId: '$job' },
            },
          },
        },
      },
      { $match: { jobId: { $ne: null } } },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job',
        },
      },
      { $unwind: '$job' },
      {
        $group: {
          _id: '$job.department', // may be string or ObjectId
          total: { $sum: 1 },
        },
      },
      {
        $addFields: {
          departmentId: {
            $cond: {
              if: { $eq: [{ $type: '$_id' }, 'objectId'] },
              then: '$_id',
              else: { $toObjectId: '$_id' },
            },
          },
        },
      },
      { $match: { departmentId: { $ne: null } } },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'departmentDetails',
        },
      },
      { $unwind: '$departmentDetails' },
      {
        $project: {
          department: '$departmentDetails.title',
          total: 1,
          _id: 0,
        },
      },
    ]);

    await this.cache.set(cacheKey, stats, { ttl: 300 });

    return stats;
  }

  private async getCompanyOrThrow(companyId: string): Promise<string> {
    const company = await this.companyModel.findById(companyId);
    if (!company) {
      throw new BadRequestException('Company not found');
    }
    return company._id.toString();
  }
}
