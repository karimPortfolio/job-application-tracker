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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dasboard_service_1 = require("./dasboard.service");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const dashboard_query_dto_1 = require("./dashboard-query.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const email_verified_guard_1 = require("../auth/email-verified.guard");
const RecruiterRoleGuard_1 = require("../common/guards/RecruiterRoleGuard");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDepartmentsStats(req) {
        const companyid = req.companyId;
        return this.dashboardService.getDepartmentsStats(companyid);
    }
    async getJobsStats(req) {
        const companyid = req.companyId;
        return this.dashboardService.getJobsStats(companyid);
    }
    async getApplicationsStats(req) {
        const companyid = req.companyId;
        return this.dashboardService.getApplicationsStats(companyid);
    }
    async getApplicationsMonthlyStats(query, req) {
        const companyId = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getMonthlyApplicationsStats(companyId, year);
    }
    async getApplicationsStatsByJobs(req, query) {
        const companyid = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getApplicationsStatsByJobs(companyid, year);
    }
    ;
    async getApplicationsStatsByCountries(req, query) {
        const companyid = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getApplicationsStatsByCountries(companyid, year);
    }
    async getApplicationsStatsByStatus(req, query) {
        const companyid = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getApplicationsStatsByStatus(companyid, year);
    }
    async getApplicationsStatsByStages(req, query) {
        const companyid = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getApplicationsStatsByStages(companyid, year);
    }
    async getApplicationsStatsByDepartments(req, query) {
        const companyid = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getApplicationsStatsByDepartments(companyid, year);
    }
    async getTopJobsByApplications(req, query) {
        const companyid = req.companyId;
        const year = query.year || new Date().getFullYear().toString();
        return this.dashboardService.getTopJobsByApplications(companyid, year);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('departments/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDepartmentsStats", null);
__decorate([
    (0, common_1.Get)('jobs/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getJobsStats", null);
__decorate([
    (0, common_1.Get)('applications/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsStats", null);
__decorate([
    (0, common_1.Get)('applications/monthly-stats'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_query_dto_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsMonthlyStats", null);
__decorate([
    (0, common_1.Get)('applications/stats-by-jobs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsStatsByJobs", null);
__decorate([
    (0, common_1.Get)('applications/stats-by-countries'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsStatsByCountries", null);
__decorate([
    (0, common_1.Get)('applications/stats-by-status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsStatsByStatus", null);
__decorate([
    (0, common_1.Get)('applications/stats-by-stages'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsStatsByStages", null);
__decorate([
    (0, common_1.Get)('applications/stats-by-departments'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getApplicationsStatsByDepartments", null);
__decorate([
    (0, common_1.Get)('applications/top-jobs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dashboard_query_dto_1.DashboardQueryDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTopJobsByApplications", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, email_verified_guard_1.EmailVerifiedGuard, CompanyGuard_1.CompanyGuard, RecruiterRoleGuard_1.RecruiterRoleGuard),
    (0, common_1.Controller)('dashboard'),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [dasboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map