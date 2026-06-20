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
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("./applications.service");
const application_query_dto_1 = require("./dto/application-query.dto");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const create_application_dto_1 = require("./dto/create-application.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const update_application_dto_1 = require("./dto/update-application.dto");
const update_application_status_dto_1 = require("./dto/update-application-status.dto");
const update_application_stage_dto_1 = require("./dto/update-application-stage.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const smart_screenig_application_dto_1 = require("./dto/smart-screenig-application.dto");
const SubscriptionCreditsGuard_1 = require("../common/guards/SubscriptionCreditsGuard");
const ai_feature_decorator_1 = require("../common/decorators/ai-feature.decorator");
const email_verified_guard_1 = require("../auth/email-verified.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const RecruiterRoleGuard_1 = require("../common/guards/RecruiterRoleGuard");
let ApplicationsController = class ApplicationsController {
    applicationsService;
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    async getCompanyApplications(req, query) {
        const companyId = req.user.company;
        return this.applicationsService.getCompanyApplications(companyId, query);
    }
    async exportApplications(format = 'csv', req, query, res) {
        const companyId = req.user.company;
        const stream = await this.applicationsService.exportApplications(companyId, format, query);
        res.setHeader('Content-Disposition', `attachment; filename="applications.${format}"`);
        res.setHeader('Content-Type', format === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        stream.pipe(res);
    }
    async createApplication(user, req, dto, file) {
        const companyId = req.user.company;
        return this.applicationsService.createApplication(companyId, user, dto, file);
    }
    async parseCandidateResume(file) {
        return this.applicationsService.parseCandidateResume(file);
    }
    async getApplicationsJobs(req) {
        const companyId = req.user.company;
        return this.applicationsService.getApplicationsJobs(companyId);
    }
    async getApplicationById(req, applicationId) {
        const companyId = req.user.company;
        return this.applicationsService.getApplicationById(applicationId, companyId);
    }
    async updateApplication(req, applicationId, dto, file) {
        const companyId = req.user.company;
        return this.applicationsService.updateApplication(applicationId, companyId, dto, file);
    }
    async deleteApplication(applicationId, req) {
        const companyId = req.user.company;
        return this.applicationsService.deleteApplication(applicationId, companyId);
    }
    async updateApplicationStatus(req, applicationId, dto) {
        const companyId = req.user.company;
        await this.applicationsService.updateApplicationStatus(applicationId, companyId, dto.status);
        return { message: 'Application status updated successfully' };
    }
    async updateApplicationStage(req, applicationId, dto) {
        const companyId = req.user.company;
        await this.applicationsService.updateApplicationStage(applicationId, companyId, dto.stage);
        return { message: 'Application stage updated successfully' };
    }
    async runningSmartScreening(req, body) {
        const companyId = req.user.company;
        return this.applicationsService.runningSmartScreening(body.applicationId, companyId);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, application_query_dto_1.ApplicationQueryDto]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "getCompanyApplications", null);
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Query)('format')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, application_query_dto_1.ApplicationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "exportApplications", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
            new common_1.FileTypeValidator({
                fileType: /(pdf|text\/plain|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
                fallbackToMimetype: true,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_application_dto_1.CreateApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "createApplication", null);
__decorate([
    (0, common_1.Post)('parse-resume'),
    (0, common_1.UseGuards)(SubscriptionCreditsGuard_1.SubscriptionCreditsGuard),
    (0, ai_feature_decorator_1.AIFeature)({ credits: 1 }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
            new common_1.FileTypeValidator({
                fileType: /(pdf|text\/plain|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
                fallbackToMimetype: true,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "parseCandidateResume", null);
__decorate([
    (0, common_1.Get)('/jobs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "getApplicationsJobs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "getApplicationById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
            new common_1.FileTypeValidator({
                fileType: /(pdf|text\/plain|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
                fallbackToMimetype: true,
            }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_application_dto_1.UpdateApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "updateApplication", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "deleteApplication", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_application_status_dto_1.UpdateApplicationStatusDto]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "updateApplicationStatus", null);
__decorate([
    (0, common_1.Patch)(':id/stage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_application_stage_dto_1.UpdateApplicationStageDto]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "updateApplicationStage", null);
__decorate([
    (0, common_1.Post)("smart-screening"),
    (0, common_1.UseGuards)(SubscriptionCreditsGuard_1.SubscriptionCreditsGuard),
    (0, ai_feature_decorator_1.AIFeature)({ credits: 1 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, smart_screenig_application_dto_1.SmartScreeningApplicationDto]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "runningSmartScreening", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, common_1.Controller)('applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, email_verified_guard_1.EmailVerifiedGuard, CompanyGuard_1.CompanyGuard, RecruiterRoleGuard_1.RecruiterRoleGuard),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map