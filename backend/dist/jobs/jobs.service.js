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
var JobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const jobs_schema_1 = require("./jobs.schema");
const jobs_filters_1 = require("./filters/jobs.filters");
const jobs_sort_1 = require("./filters/jobs.sort");
const jobs_csv_exporter_1 = require("./exporters/jobs-csv.exporter");
const jobs_xlsx_exporter_1 = require("./exporters/jobs-xlsx.exporter");
const job_description_prompt_1 = require("../ai/prompts/job-description.prompt");
const ai_service_1 = require("../ai/ai.service");
const jobs_types_1 = require("./types/jobs.types");
let JobsService = JobsService_1 = class JobsService {
    jobModel;
    companyModel;
    departmentModel;
    userModel;
    csvExporter;
    xlsxExporter;
    aiService;
    cache;
    constructor(jobModel, companyModel, departmentModel, userModel, csvExporter, xlsxExporter, aiService, cache) {
        this.jobModel = jobModel;
        this.companyModel = companyModel;
        this.departmentModel = departmentModel;
        this.userModel = userModel;
        this.csvExporter = csvExporter;
        this.xlsxExporter = xlsxExporter;
        this.aiService = aiService;
        this.cache = cache;
    }
    logger = new common_1.Logger(JobsService_1.name);
    async findAll(query) {
        const filter = (0, jobs_filters_1.buildJobFilter)(query);
        const sort = (0, jobs_sort_1.buildJobSort)(query);
        filter.status = jobs_types_1.JobStatus.PUBLISHED;
        return this.jobModel.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort,
            select: '-user -description',
            populate: [
                { path: 'department', select: 'title' },
                { path: 'company', select: 'name' },
            ],
            lean: true,
            leanWithVirtuals: true,
        });
    }
    async getCompanyJobs(companyId, query) {
        const company = await this.getCompanyOrThrow(companyId);
        const filter = (0, jobs_filters_1.buildJobFilter)(query, company);
        const sort = (0, jobs_sort_1.buildJobSort)(query);
        return this.jobModel.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort,
            populate: [
                { path: 'department', select: 'title' },
                { path: 'user', select: 'name' },
            ],
            lean: true,
            leanWithVirtuals: true,
        });
    }
    async createJob(companyId, user, dto) {
        const company = await this.getCompanyOrThrow(companyId);
        const userId = await this.getUserorThrow(user.sub);
        const department = await this.getDepartmentOrThrow(dto.department);
        const job = await this.jobModel.create({
            title: dto.title,
            description: dto.description,
            country: dto.country,
            city: dto.city,
            status: dto.status,
            employmentType: dto.employmentType,
            experienceLevel: dto.experienceLevel,
            isRemote: dto.isRemote,
            salaryMin: dto.salaryMin,
            salaryMax: dto.salaryMax,
            company: company,
            department: department,
            user: userId,
        });
        return job;
    }
    async getJobById(jobId, companyId) {
        const chachedJob = await this.getCachedJob(jobId, companyId);
        if (chachedJob)
            return chachedJob;
        const job = await this.jobModel.findById(jobId);
        if (!job)
            throw new common_1.BadRequestException('Job not found');
        if (job.company?.toString() !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await job.populate([
            { path: 'department', select: 'title' },
            { path: 'company', select: 'name' },
        ]);
        await this.cache.set(this.getCacheKey(jobId), job, 60 * 1000);
        return job;
    }
    async getPublicJobById(jobId) {
        const cachedJob = await this.cache.get(this.getCacheKey(jobId));
        if (cachedJob)
            return cachedJob;
        const job = await this.jobModel.findOne({
            _id: jobId,
            status: 'published',
        });
        if (!job)
            throw new common_1.BadRequestException('Job not found');
        await job.populate([
            { path: 'department', select: 'title' },
            { path: 'company', select: 'name' },
        ]);
        await this.cache.set(this.getCacheKey(jobId), job, 60 * 1000);
        return job;
    }
    async updateJob(jobId, companyId, dto) {
        const job = await this.jobModel.findOne({ _id: jobId, company: companyId });
        if (!job)
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        await this.jobModel.updateOne({ _id: jobId }, { $set: dto });
        const updatedJob = await this.jobModel.findById(jobId);
        await this.cache.set(this.getCacheKey(jobId), updatedJob, 60 * 1000);
        return updatedJob;
    }
    async incrementApplicationsCount(jobId) {
        const job = await this.jobModel.findById(jobId);
        if (!job)
            throw new common_1.BadRequestException('Job not found');
        job.applicationsCount = (job.applicationsCount || 0) + 1;
        await job.save();
        return job;
    }
    async incrementViewsCount(jobId) {
        const job = await this.jobModel.findById(jobId);
        if (!job)
            throw new common_1.BadRequestException('Job not found');
        job.viewsCount = (job.viewsCount || 0) + 1;
        await job.save();
        return job;
    }
    async deleteJob(jobId, companyId) {
        const job = await this.jobModel.findOne({ _id: jobId, company: companyId });
        if (!job)
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        await this.jobModel.deleteOne({ _id: jobId });
        await this.cache.del(this.getCacheKey(jobId));
        return { message: 'Job deleted successfully' };
    }
    async exportJobs(companyId, format, query) {
        const company = await this.getCompanyOrThrow(companyId);
        const filter = (0, jobs_filters_1.buildJobFilter)(query, company);
        const sort = (0, jobs_sort_1.buildJobSort)(query);
        const jobs = await this.jobModel
            .find(filter)
            .sort(sort)
            .populate([{ path: 'department', select: 'title' }])
            .lean();
        const exportRows = jobs.map((job) => ({
            ...job,
            departmentTitle: job?.department?.title ?? '',
        }));
        if (format === 'xlsx') {
            return this.xlsxExporter.export(exportRows);
        }
        return this.csvExporter.export(exportRows);
    }
    async updateJobStatus(jobId, companyId, dto) {
        const job = await this.jobModel.findById(jobId);
        if (!job)
            throw new common_1.BadRequestException('Job not found');
        if (job.company?.toString() !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await this.jobModel.updateOne({ _id: jobId }, { $set: dto });
        await this.cache.del(this.getCacheKey(jobId));
        const updatedJob = await this.jobModel.findById(jobId);
        return updatedJob;
    }
    async getCompanyDepartments(companyId) {
        const company = await this.getCompanyOrThrow(companyId);
        const cachedDepartments = await this.cache.get(this.getCompanyDepartmentsCacheKey(company));
        if (cachedDepartments) {
            return cachedDepartments;
        }
        const departments = await this.departmentModel
            .find({ company })
            .select('title _id')
            .lean();
        await this.cache.set(this.getCompanyDepartmentsCacheKey(company), departments, 60 * 1000);
        return departments;
    }
    async getGeneratedJobDescription(dto) {
        const prompt = (0, job_description_prompt_1.buildJobDescriptionPrompt)(dto);
        const text = await this.aiService.run({
            prompt,
            maxTokens: 1000,
            feature: 'job-description',
            temperature: 0.7,
        });
        return {
            context: text,
        };
    }
    async getCachedJob(jobId, companyId) {
        const cachedJob = await this.cache.get(this.getCacheKey(jobId));
        if (!cachedJob)
            return null;
        if (cachedJob.company?._id?.toString() !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        return cachedJob;
    }
    getCompanyDepartmentsCacheKey(companyId) {
        return `${companyId}:jobs:departments`;
    }
    getCacheKey(jobId) {
        return `job:${jobId}`;
    }
    async getCompanyOrThrow(companyId) {
        const company = await this.companyModel.findById(companyId);
        if (!company)
            throw new common_1.BadRequestException('Company not found');
        return companyId;
    }
    async getUserorThrow(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return userId;
    }
    async getDepartmentOrThrow(departmentId) {
        const department = await this.departmentModel.findById(departmentId);
        if (!department)
            throw new common_1.BadRequestException('Department not found');
        return departmentId;
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = JobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(jobs_schema_1.Job.name)),
    __param(1, (0, mongoose_1.InjectModel)('Company')),
    __param(2, (0, mongoose_1.InjectModel)('Department')),
    __param(3, (0, mongoose_1.InjectModel)('User')),
    __param(7, (0, common_1.Inject)('CACHE_MANAGER')),
    __metadata("design:paramtypes", [Object, mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jobs_csv_exporter_1.JobsCsvExporter,
        jobs_xlsx_exporter_1.JobsXlsxExporter,
        ai_service_1.AIService, Object])
], JobsService);
//# sourceMappingURL=jobs.service.js.map