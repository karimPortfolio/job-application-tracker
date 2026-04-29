"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const departments_schema_1 = require("../departments/departments.schema");
const mongoose_1 = require("mongoose");
const company_schema_1 = require("../companies/company.schema");
const jobs_schema_1 = require("../jobs/jobs.schema");
const applications_schema_1 = require("../applications/applications.schema");
const mongoose_2 = require("@nestjs/mongoose");
const dashboard_utils_1 = require("./utils/dashboard.utils");
const applications_constants_1 = require("../applications/constants/applications-constants");
let DashboardService = class DashboardService {
    departmentModel;
    companyModel;
    jobModel;
    applicationModel;
    cache;
    dashboardUtils;
    constructor(departmentModel, companyModel, jobModel, applicationModel, cache, dashboardUtils) {
        this.departmentModel = departmentModel;
        this.companyModel = companyModel;
        this.jobModel = jobModel;
        this.applicationModel = applicationModel;
        this.cache = cache;
        this.dashboardUtils = dashboardUtils;
    }
    async getDepartmentsStats(companyId) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:departmentsTotal:${companyId}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const total = await this.departmentModel.countDocuments({
            company: company,
        });
        const currentMonthTotal = await this.dashboardUtils.currentMonthTotal(company, this.departmentModel);
        const lastMonthTotal = await this.dashboardUtils.lastMonthTotal(company, this.departmentModel);
        const monthsDiff = this.dashboardUtils.calculateDiff(currentMonthTotal, lastMonthTotal);
        await this.cache.set(cacheKey, { total, monthsDiff }, { ttl: 300 });
        return {
            total,
            monthsDiff,
        };
    }
    async getJobsStats(companyId) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:jobsTotal:${companyId}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const total = await this.jobModel.countDocuments({
            company: company,
        });
        const currentMonthTotal = await this.dashboardUtils.currentMonthTotal(company, this.jobModel);
        const lastMonthTotal = await this.dashboardUtils.lastMonthTotal(company, this.jobModel);
        const monthsDiff = this.dashboardUtils.calculateDiff(currentMonthTotal, lastMonthTotal);
        await this.cache.set(cacheKey, { total, monthsDiff }, { ttl: 300 });
        return {
            total,
            monthsDiff,
        };
    }
    async getApplicationsStats(companyId) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:applicationsTotal:${companyId}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const total = await this.applicationModel.countDocuments({
            company: company,
        });
        const currentMonthTotal = await this.dashboardUtils.currentMonthTotal(company, this.applicationModel);
        const lastMonthTotal = await this.dashboardUtils.lastMonthTotal(company, this.applicationModel);
        const monthsDiff = this.dashboardUtils.calculateDiff(currentMonthTotal, lastMonthTotal);
        await this.cache.set(cacheKey, { total, monthsDiff }, { ttl: 300 });
        return {
            total,
            monthsDiff,
        };
    }
    async getMonthlyApplicationsStats(companyId, year) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:monthlyApplications:${companyId}:${year}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const monthlyStats = await this.dashboardUtils.getTotalsByYearPeriod(year, company, this.applicationModel);
        await this.cache.set(cacheKey, monthlyStats, { ttl: 300 });
        return monthlyStats;
    }
    async getApplicationsStatsByJobs(companyId, year) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:applicationsByJobs:${companyId}:${year}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const stats = this.dashboardUtils.getApplicationsTotalByJobs(company, this.applicationModel, year);
        await this.cache.set(cacheKey, stats, { ttl: 300 });
        return stats;
    }
    async getApplicationsStatsByCountries(companyId, year) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:applicationsByCountries:${companyId}:${year}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const results = await this.dashboardUtils.getTotalsByCountries(company, this.applicationModel, year);
        await this.cache.set(cacheKey, results, { ttl: 300 });
        return results;
    }
    async getApplicationsStatsByStatus(companyId, year) {
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
        const statusMap = Object.fromEntries(applications_constants_1.APPLICATION_STATUSES.map((s) => [s.value, s.label]));
        const results = stats.map((i) => {
            return {
                status: statusMap[i.status] || i.status,
                total: i.total,
            };
        });
        await this.cache.set(cacheKey, results, { ttl: 300 });
        return results;
    }
    async getApplicationsStatsByStages(companyId, year) {
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
        const stagesMap = Object.fromEntries(applications_constants_1.APPLICATION_STAGES.map((s) => [s.value, s.label]));
        const results = stats.map((i) => {
            return {
                stage: stagesMap[i.stage] || i.stage,
                total: i.total,
            };
        });
        await this.cache.set(cacheKey, results, { ttl: 300 });
        return results;
    }
    async getApplicationsStatsByDepartments(companyId, year) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:applicationsByDepartments:${companyId}:${year}`;
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
                    _id: '$job.department',
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
    async getTopJobsByApplications(companyId, year) {
        const company = await this.getCompanyOrThrow(companyId);
        const cacheKey = `dashboard:topJobsByApplications:${companyId}:${year}`;
        const cachedValue = await this.cache.get(cacheKey);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
        const stats = await this.dashboardUtils
            .getApplicationsTotalByJobs(company, this.applicationModel, year, 5);
        await this.cache.set(cacheKey, stats, { ttl: 300 });
        return stats;
    }
    async getCompanyOrThrow(companyId) {
        const company = await this.companyModel.findById(companyId);
        if (!company) {
            throw new common_1.BadRequestException('Company not found');
        }
        return company._id.toString();
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(departments_schema_1.Department.name)),
    __param(1, (0, mongoose_2.InjectModel)(company_schema_1.Company.name)),
    __param(2, (0, mongoose_2.InjectModel)(jobs_schema_1.Job.name)),
    __param(3, (0, mongoose_2.InjectModel)(applications_schema_1.Application.name)),
    __param(4, (0, common_1.Inject)('CACHE_MANAGER')),
    __param(5, (0, common_1.Inject)(dashboard_utils_1.DashboardUtils)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model, Object, dashboard_utils_1.DashboardUtils])
], DashboardService);
//# sourceMappingURL=dasboard.service.js.map