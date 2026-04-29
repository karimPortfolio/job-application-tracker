"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsCsvExporter = void 0;
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const csv_stringify_1 = require("csv-stringify");
const applications_constants_1 = require("../constants/applications-constants");
let ApplicationsCsvExporter = class ApplicationsCsvExporter {
    export(applications) {
        const stream = new stream_1.PassThrough();
        const csv = (0, csv_stringify_1.stringify)({
            header: true,
            columns: [
                { key: 'fullName', header: 'Full Name' },
                { key: 'email', header: 'Email' },
                { key: 'phoneNumber', header: 'Phone Number' },
                { key: 'linkedInUrl', header: 'LinkedIn URL' },
                { key: 'githubUrl', header: 'GitHub URL' },
                { key: 'portfolioUrl', header: 'Portfolio URL' },
                { key: 'resumeUrl', header: 'Resume URL' },
                { key: 'country', header: 'Country' },
                { key: 'city', header: 'City' },
                { key: 'jobTitle', header: 'Job Title' },
                { key: 'companyName', header: 'Company Name' },
                { key: 'status', header: 'Status' },
                { key: 'stage', header: 'Stage' },
                { key: 'source', header: 'Source' },
                { key: 'appliedAt', header: 'Applied At' },
                { key: 'rating', header: 'Rating' },
                { key: 'aiScore', header: 'AI Score' },
                { key: 'notes', header: 'Notes' },
            ],
        });
        csv.pipe(stream);
        for (const application of applications) {
            const status = application.status ? getLabel(application.status, applications_constants_1.APPLICATION_STATUSES) : 'N/A';
            const stage = application.stage ? getLabel(application.stage, applications_constants_1.APPLICATION_STAGES) : 'N/A';
            csv.write({
                fullName: application.fullName ?? 'N/A',
                email: application.email ?? 'N/A',
                phoneNumber: application.phoneNumber ?? 'N/A',
                linkedInUrl: application.linkedInUrl ?? 'N/A',
                githubUrl: application.githubUrl ?? 'N/A',
                portfolioUrl: application.portfolioUrl ?? 'N/A',
                resumeUrl: application.resumeUrl ?? 'N/A',
                country: application.country ?? 'N/A',
                city: application.city ?? 'N/A',
                jobTitle: application.jobTitle ?? 'N/A',
                companyName: application.companyName ?? 'N/A',
                status,
                stage,
                source: application.source ?? 'N/A',
                appliedAt: application.appliedAt?.toISOString?.() ||
                    application.appliedAt ||
                    'N/A',
                rating: application.rating ?? 'N/A',
                aiScore: application.aiScore ?? 'N/A',
                notes: application.notes ?? 'N/A',
            });
        }
        csv.end();
        return stream;
    }
};
exports.ApplicationsCsvExporter = ApplicationsCsvExporter;
exports.ApplicationsCsvExporter = ApplicationsCsvExporter = __decorate([
    (0, common_1.Injectable)()
], ApplicationsCsvExporter);
function getLabel(value, records) {
    const record = records.find((r) => r.value === value);
    return record ? record.label : 'N/A';
}
//# sourceMappingURL=applications-csv.exporter.js.map