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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs.service");
const job_query_dto_1 = require("./dto/job-query.dto");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const create_job_dto_1 = require("./dto/create-job.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const update_job_dto_1 = require("./dto/update-job.dto");
const class_transformer_1 = require("class-transformer");
const job_response_dto_1 = require("./dto/job-response.dto");
const update_job_status_dto_1 = require("./dto/update-job-status.dto");
const generate_job_dto_1 = require("./dto/generate-job.dto");
const SubscriptionCreditsGuard_1 = require("../common/guards/SubscriptionCreditsGuard");
const ai_feature_decorator_1 = require("../common/decorators/ai-feature.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const email_verified_guard_1 = require("../auth/email-verified.guard");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async getCompanyJobs(req, query) {
        const companyId = req.user.company;
        const result = await this.jobsService.getCompanyJobs(companyId, query);
        return {
            ...result,
            docs: (0, class_transformer_1.plainToInstance)(job_response_dto_1.JobResponseDto, result.docs, {
                excludeExtraneousValues: true,
            }),
        };
    }
    async exportJobs(format = 'csv', req, query, res) {
        const companyId = req.user.company;
        const stream = await this.jobsService.exportJobs(companyId, format, query);
        res.setHeader('Content-Disposition', `attachment; filename="jobs.${format}"`);
        res.setHeader('Content-Type', format === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        stream.pipe(res);
    }
    async createJob(user, req, dto) {
        const companyId = req.user.company;
        return this.jobsService.createJob(companyId, user, dto);
    }
    async generateJobDescription(dto) {
        return this.jobsService.getGeneratedJobDescription(dto);
    }
    async getCompanyDepartments(req) {
        const companyId = req.user.company;
        return this.jobsService.getCompanyDepartments(companyId);
    }
    async getJobById(req, jobId) {
        const companyId = req.user.company;
        return this.jobsService.getJobById(jobId, companyId);
    }
    async updateJob(req, jobId, dto) {
        const companyId = req.user.company;
        return this.jobsService.updateJob(jobId, companyId, dto);
    }
    async deleteJob(id, req) {
        const companyId = req.user.company;
        return this.jobsService.deleteJob(id, companyId);
    }
    async incrementApplicationsCount(jobId) {
        await this.jobsService.incrementApplicationsCount(jobId);
        return { message: 'Applications count incremented' };
    }
    async incrementViewsCount(jobId) {
        await this.jobsService.incrementViewsCount(jobId);
        return { message: 'Views count incremented' };
    }
    async updateJobStatus(req, jobId, dto) {
        const companyId = req.user.company;
        await this.jobsService.updateJobStatus(jobId, companyId, dto);
        return { message: 'Job status updated successfully' };
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, job_query_dto_1.JobQueryDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getCompanyJobs", null);
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Query)('format')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, job_query_dto_1.JobQueryDto, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "exportJobs", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createJob", null);
__decorate([
    (0, common_1.Post)('generate-description'),
    (0, common_1.UseGuards)(SubscriptionCreditsGuard_1.SubscriptionCreditsGuard),
    (0, ai_feature_decorator_1.AIFeature)({ credits: 1 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_job_dto_1.GenerateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "generateJobDescription", null);
__decorate([
    (0, common_1.Get)('departments'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getCompanyDepartments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Patch)(':id/increment-applications'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "incrementApplicationsCount", null);
__decorate([
    (0, common_1.Patch)(':id/increment-views'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "incrementViewsCount", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_job_status_dto_1.UpdateJobStatusDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateJobStatus", null);
exports.JobsController = JobsController = __decorate([
    (0, common_1.Controller)('jobs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, email_verified_guard_1.EmailVerifiedGuard, CompanyGuard_1.CompanyGuard),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map