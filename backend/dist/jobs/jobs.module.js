"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const user_schema_1 = require("../users/user.schema");
const company_schema_1 = require("../companies/company.schema");
const jobs_schema_1 = require("./jobs.schema");
const departments_schema_1 = require("../departments/departments.schema");
const jobs_service_1 = require("./jobs.service");
const jobs_controller_1 = require("./jobs.controller");
const jobs_csv_exporter_1 = require("./exporters/jobs-csv.exporter");
const jobs_xlsx_exporter_1 = require("./exporters/jobs-xlsx.exporter");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const public_jobs_controller_1 = require("./public-jobs.controller");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: jobs_schema_1.Job.name, schema: jobs_schema_1.JobSchema },
                { name: company_schema_1.Company.name, schema: company_schema_1.CompanySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: departments_schema_1.Department.name, schema: departments_schema_1.DepartmentSchema },
            ]),
            users_module_1.UsersModule,
        ],
        exports: [mongoose_1.MongooseModule],
        providers: [jobs_service_1.JobsService, jobs_csv_exporter_1.JobsCsvExporter, jobs_xlsx_exporter_1.JobsXlsxExporter, CompanyGuard_1.CompanyGuard],
        controllers: [jobs_controller_1.JobsController, public_jobs_controller_1.PublicJobsController],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map