"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const user_schema_1 = require("../users/user.schema");
const departments_schema_1 = require("./departments.schema");
const company_schema_1 = require("../companies/company.schema");
const departments_service_1 = require("./departments.service");
const departments_controller_1 = require("./departments.controller");
const jobs_schema_1 = require("../jobs/jobs.schema");
const departments_csv_exporter_1 = require("./exporters/departments-csv.exporter");
const departments_xlsx_exporter_1 = require("./exporters/departments-xlsx.exporter");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
let DepartmentsModule = class DepartmentsModule {
};
exports.DepartmentsModule = DepartmentsModule;
exports.DepartmentsModule = DepartmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: departments_schema_1.Department.name, schema: departments_schema_1.DepartmentSchema },
                { name: company_schema_1.Company.name, schema: company_schema_1.CompanySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: jobs_schema_1.Job.name, schema: jobs_schema_1.JobSchema },
            ]),
            users_module_1.UsersModule,
        ],
        exports: [mongoose_1.MongooseModule],
        providers: [departments_service_1.DepartmentsService, departments_xlsx_exporter_1.DepartmentsXlsxExporter, departments_csv_exporter_1.DepartmentsCsvExporter, CompanyGuard_1.CompanyGuard],
        controllers: [departments_controller_1.DepartmentsController]
    })
], DepartmentsModule);
//# sourceMappingURL=departments.module.js.map