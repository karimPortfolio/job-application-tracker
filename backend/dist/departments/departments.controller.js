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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("./departments.service");
const passport_1 = require("@nestjs/passport");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const department_query_dto_1 = require("./dto/department-query.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let DepartmentsController = class DepartmentsController {
    departmentsService;
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async findAll(req, query) {
        return this.departmentsService.findAllByCompany(req.companyId, query);
    }
    async create(req, dto, user) {
        return this.departmentsService.createDepartment(dto, req.companyId, user);
    }
    async exportDepartments(format = 'csv', req, query, res) {
        const stream = await this.departmentsService.exportDepartments(req.companyId, format, query);
        res.setHeader('Content-Disposition', `attachment; filename="departments.${format}"`);
        res.setHeader('Content-Type', format === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        stream.pipe(res);
    }
    async findById(id, req) {
        return this.departmentsService.findDepartmentById(id, req.companyId);
    }
    async update(id, dto, req) {
        return this.departmentsService.updateDepartment(id, dto, req.companyId);
    }
    async delete(id, req) {
        return this.departmentsService.deleteDepartment(id, req.companyId);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, department_query_dto_1.DepartmentQueryDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_department_dto_1.CreateDepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Query)('format')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "exportDepartments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "delete", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), CompanyGuard_1.CompanyGuard),
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map