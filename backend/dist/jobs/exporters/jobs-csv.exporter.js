"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsCsvExporter = void 0;
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const csv_stringify_1 = require("csv-stringify");
let JobsCsvExporter = class JobsCsvExporter {
    export(jobs) {
        const stream = new stream_1.PassThrough();
        const csv = (0, csv_stringify_1.stringify)({
            header: true,
            columns: [
                { key: 'title', header: 'Title' },
                { key: 'country', header: 'Country' },
                { key: 'city', header: 'City' },
                { key: 'status', header: 'Status' },
                { key: 'employmentType', header: 'Employment Type' },
                { key: 'experienceLevel', header: 'Experience Level' },
                { key: 'isRemote', header: 'Remote' },
                { key: 'salaryMin', header: 'Salary Min' },
                { key: 'salaryMax', header: 'Salary Max' },
                { key: 'department', header: 'Department' },
                { key: 'applicants', header: 'Applicants' },
                { key: 'createdAtDiff', header: 'Creation details' },
            ],
        });
        csv.pipe(stream);
        for (const job of jobs) {
            const status = job.status ? capitalize(job.status) : 'N/A';
            const employmentType = job.employmentType ? capitalize(job.employmentType) : 'N/A';
            const experienceLevel = job.experienceLevel ? capitalize(job.experienceLevel) : 'N/A';
            const country = job.country ? capitalize(job.country) : 'N/A';
            const city = job.city ? capitalize(job.city) : 'N/A';
            csv.write({
                title: job.title,
                status,
                employmentType,
                experienceLevel,
                isRemote: job.isRemote ? 'Yes' : 'No',
                country,
                city,
                salaryMin: job.salaryMin ?? 'N/A',
                salaryMax: job.salaryMax ?? 'N/A',
                department: job.departmentTitle ?? 'N/A',
                applicants: job.applicationsCount ?? 0,
                createdAtDiff: job.createdAtDiff || job.createdAt?.toISOString?.() || 'N/A',
            });
        }
        csv.end();
        return stream;
    }
};
exports.JobsCsvExporter = JobsCsvExporter;
exports.JobsCsvExporter = JobsCsvExporter = __decorate([
    (0, common_1.Injectable)()
], JobsCsvExporter);
function capitalize(value) {
    const str = String(value);
    return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
}
//# sourceMappingURL=jobs-csv.exporter.js.map