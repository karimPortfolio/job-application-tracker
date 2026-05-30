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
exports.DepartmentsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const departments_schema_1 = require("./departments.schema");
const company_schema_1 = require("../companies/company.schema");
const date_fns_1 = require("date-fns");
const common_1 = require("@nestjs/common");
const department_filters_1 = require("./filters/department.filters");
const department_sort_1 = require("./filters/department.sort");
const user_schema_1 = require("../users/user.schema");
const jobs_schema_1 = require("../jobs/jobs.schema");
const departments_csv_exporter_1 = require("./exporters/departments-csv.exporter");
const departments_xlsx_exporter_1 = require("./exporters/departments-xlsx.exporter");
let DepartmentsService = class DepartmentsService {
    departmentModel;
    companyModel;
    userModel;
    jobModel;
    csvExporter;
    xlsxExporter;
    cache;
    constructor(departmentModel, companyModel, userModel, jobModel, csvExporter, xlsxExporter, cache) {
        this.departmentModel = departmentModel;
        this.companyModel = companyModel;
        this.userModel = userModel;
        this.jobModel = jobModel;
        this.csvExporter = csvExporter;
        this.xlsxExporter = xlsxExporter;
        this.cache = cache;
    }
    async findAllByCompany(companyId, query) {
        const company = await this.getCompanyOrThrow(companyId);
        const departments = await this.fetchPaginatedDepartments(company, query);
        if (departments.docs.length === 0)
            return departments;
        const departmentIds = departments.docs.map((d) => d._id.toString());
        const jobsCountMap = await this.getJobsCountMap(companyId, departmentIds);
        departments.docs = departments.docs.map((dep) => ({
            ...dep,
            jobsCount: jobsCountMap[dep._id.toString()] ?? 0,
            createdAtDiff: dep.createdAtDiff ??
                (dep.createdAt
                    ? (0, date_fns_1.formatDistanceToNow)(new Date(dep.createdAt), { addSuffix: true })
                    : null),
        }));
        return departments;
    }
    async createDepartment(dto, companyId, user) {
        const company = await this.getCompanyOrThrow(companyId);
        const userId = await this.getUserorThrow(user.sub);
        const department = await this.departmentModel.create({
            ...dto,
            company: company,
            user: userId,
        });
        return department;
    }
    async findDepartmentById(departmentId, companyId) {
        const cachedDepartment = await this.getCachedDepartment(departmentId, companyId);
        if (cachedDepartment) {
            return cachedDepartment;
        }
        const department = await this.departmentModel.findById(departmentId);
        if (!department) {
            throw new common_1.BadRequestException('Department not found');
        }
        await this.cache.set(this.getCacheKey(departmentId), department, 60 * 1000);
        return department;
    }
    async updateDepartment(departmentId, dto, companyId) {
        const department = await this.departmentModel.findOne({
            _id: departmentId,
            company: companyId,
        });
        if (!department) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await this.departmentModel.updateOne({ _id: departmentId }, { $set: dto });
        const updatedDepartment = await this.departmentModel.findById(departmentId);
        await this.cache.set(this.getCacheKey(departmentId), updatedDepartment, 60 * 1000);
        return updatedDepartment;
    }
    async deleteDepartment(departmentId, companyId) {
        const department = await this.departmentModel.findOne({
            _id: departmentId,
            company: companyId,
        });
        if (!department) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await this.departmentModel.deleteOne({ _id: departmentId });
        await this.cache.del(this.getCacheKey(departmentId));
        return { message: 'Department deleted successfully' };
    }
    async exportDepartments(companyId, format, query) {
        const company = await this.getCompanyOrThrow(companyId);
        const departments = await this.getDepartmentsForExport(company, query);
        if (format === 'xlsx') {
            return this.xlsxExporter.export(departments);
        }
        return this.csvExporter.export(departments);
    }
    async getCachedDepartment(departmentId, companyId) {
        const cachedDepartment = await this.cache.get(this.getCacheKey(departmentId));
        if (!cachedDepartment) {
            return null;
        }
        return cachedDepartment;
    }
    async getDepartmentsForExport(company, query) {
        return this.departmentModel
            .find((0, department_filters_1.buildDepartmentFilter)(company, query))
            .lean();
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
    async fetchPaginatedDepartments(company, query) {
        return this.departmentModel.paginate((0, department_filters_1.buildDepartmentFilter)(company, query), {
            page: query.page || 1,
            limit: Math.min(query.limit || 10, 50),
            sort: (0, department_sort_1.buildDepartmentSort)(query.sortBy, query.order),
            populate: [{ path: 'user', select: 'name' }],
            lean: true,
            leanVirtuals: true,
        });
    }
    async getJobsCountMap(companyId, departmentIds) {
        const counts = await this.jobModel.aggregate([
            {
                $match: {
                    department: { $in: departmentIds },
                    status: { $in: ['published', 'closed'] },
                    company: companyId,
                },
            },
            { $group: { _id: '$department', count: { $sum: 1 } } },
        ]);
        return Object.fromEntries(counts.map((j) => [j._id.toString(), j.count]));
    }
    getCacheKey(departmentId) {
        return `department:${departmentId}`;
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(departments_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(jobs_schema_1.Job.name)),
    __param(6, (0, common_1.Inject)('CACHE_MANAGER')),
    __metadata("design:paramtypes", [Object, Function, Function, Function, departments_csv_exporter_1.DepartmentsCsvExporter,
        departments_xlsx_exporter_1.DepartmentsXlsxExporter, Object])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map