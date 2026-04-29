"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const user_schema_1 = require("../users/user.schema");
const company_schema_1 = require("../companies/company.schema");
const applications_schema_1 = require("./applications.schema");
const jobs_schema_1 = require("../jobs/jobs.schema");
const applications_service_1 = require("./applications.service");
const applications_controller_1 = require("./applications.controller");
const public_applications_controller_1 = require("./public-applications.controller");
const applications_csv_exporter_1 = require("./exporters/applications-csv.exporter");
const applications_xlsx_exporter_1 = require("./exporters/applications-xlsx.exporter");
const CompanyGuard_1 = require("../common/guards/CompanyGuard");
const s3_uploader_1 = require("../common/utils/s3-uploader");
const is_application_email_uniqe_validator_1 = require("../common/decorators/is-application-email-uniqe.validator");
const ai_service_1 = require("../ai/ai.service");
let ApplicationsModule = class ApplicationsModule {
};
exports.ApplicationsModule = ApplicationsModule;
exports.ApplicationsModule = ApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: applications_schema_1.Application.name, schema: applications_schema_1.ApplicationSchema },
                { name: company_schema_1.Company.name, schema: company_schema_1.CompanySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: jobs_schema_1.Job.name, schema: jobs_schema_1.JobSchema },
            ]),
            users_module_1.UsersModule,
        ],
        exports: [mongoose_1.MongooseModule],
        providers: [
            applications_service_1.ApplicationsService,
            ai_service_1.AIService,
            applications_csv_exporter_1.ApplicationsCsvExporter,
            applications_xlsx_exporter_1.ApplicationsXlsxExporter,
            s3_uploader_1.S3Uploader,
            is_application_email_uniqe_validator_1.IsApplicationEmailUniqueConstraint,
            CompanyGuard_1.CompanyGuard,
        ],
        controllers: [applications_controller_1.ApplicationsController, public_applications_controller_1.PublicApplicationsController],
    })
], ApplicationsModule);
//# sourceMappingURL=applications.module.js.map