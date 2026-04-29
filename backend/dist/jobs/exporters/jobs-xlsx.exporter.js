"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsXlsxExporter = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const stream_1 = require("stream");
let JobsXlsxExporter = class JobsXlsxExporter {
    async export(jobs) {
        const workbook = new exceljs_1.Workbook();
        const sheet = workbook.addWorksheet('Jobs');
        sheet.columns = [
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Country', key: 'country', width: 15 },
            { header: 'City', key: 'city', width: 15 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Employment Type', key: 'employmentType', width: 20 },
            { header: 'Experience Level', key: 'experienceLevel', width: 18 },
            { header: 'Remote', key: 'isRemote', width: 10 },
            { header: 'Salary Min', key: 'salaryMin', width: 15 },
            { header: 'Salary Max', key: 'salaryMax', width: 15 },
            { header: 'Department', key: 'department', width: 20 },
            { header: 'Applicants', key: 'applicants', width: 20 },
            { header: 'Creation details', key: 'createdAtDiff', width: 25 },
        ];
        jobs.forEach((job) => {
            const status = job.status ? capitalize(job.status) : 'N/A';
            const employmentType = job.employmentType ? capitalize(job.employmentType) : 'N/A';
            const experienceLevel = job.experienceLevel ? capitalize(job.experienceLevel) : 'N/A';
            const country = job.country ? capitalize(job.country) : 'N/A';
            const city = job.city ? capitalize(job.city) : 'N/A';
            sheet.addRow({
                title: job.title,
                status,
                employmentType,
                experienceLevel,
                isRemote: job.isRemote ? 'Yes' : 'No',
                country,
                city,
                department: job.departmentTitle ?? 'N/A',
                createdAtDiff: job.createdAtDiff || job.createdAt?.toISOString?.() || 'N/A',
                salaryMin: job.salaryMin ?? 'N/A',
                salaryMax: job.salaryMax ?? 'N/A',
                applicants: job.applicationsCount ?? 0,
            });
        });
        const stream = new stream_1.PassThrough();
        await workbook.xlsx.write(stream);
        return stream;
    }
};
exports.JobsXlsxExporter = JobsXlsxExporter;
exports.JobsXlsxExporter = JobsXlsxExporter = __decorate([
    (0, common_1.Injectable)()
], JobsXlsxExporter);
function capitalize(value) {
    const str = String(value);
    return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
}
//# sourceMappingURL=jobs-xlsx.exporter.js.map