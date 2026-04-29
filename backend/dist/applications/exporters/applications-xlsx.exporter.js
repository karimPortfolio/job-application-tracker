"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsXlsxExporter = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const stream_1 = require("stream");
const applications_constants_1 = require("../constants/applications-constants");
let ApplicationsXlsxExporter = class ApplicationsXlsxExporter {
    async export(candidates) {
        const workbook = new exceljs_1.Workbook();
        const sheet = workbook.addWorksheet('Candidates');
        sheet.columns = [
            { header: 'Full Name', key: 'fullName', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Phone Number', key: 'phoneNumber', width: 18 },
            { header: 'LinkedIn URL', key: 'linkedInUrl', width: 25 },
            { header: 'GitHub URL', key: 'githubUrl', width: 25 },
            { header: 'Portfolio URL', key: 'portfolioUrl', width: 25 },
            { header: 'Resume URL', key: 'resumeUrl', width: 25 },
            { header: 'Country', key: 'country', width: 15 },
            { header: 'City', key: 'city', width: 15 },
            { header: 'Job Title', key: 'jobTitle', width: 20 },
            { header: 'Company Name', key: 'companyName', width: 20 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Stage', key: 'stage', width: 20 },
            { header: 'Source', key: 'source', width: 15 },
            { header: 'Applied At', key: 'appliedAt', width: 20 },
            { header: 'Rating', key: 'rating', width: 10 },
            { header: 'AI Score', key: 'aiScore', width: 10 },
            { header: 'Notes', key: 'notes', width: 30 },
        ];
        candidates.forEach((candidate) => {
            const status = candidate.status ? getLabel(candidate.status, applications_constants_1.APPLICATION_STATUSES) : 'N/A';
            const stage = candidate.stage ? getLabel(candidate.stage, applications_constants_1.APPLICATION_STAGES) : 'N/A';
            sheet.addRow({
                fullName: candidate.fullName ?? 'N/A',
                email: candidate.email ?? 'N/A',
                phoneNumber: candidate.phoneNumber ?? 'N/A',
                linkedInUrl: candidate.linkedInUrl ?? 'N/A',
                githubUrl: candidate.githubUrl ?? 'N/A',
                portfolioUrl: candidate.portfolioUrl ?? 'N/A',
                resumeUrl: candidate.resumeUrl ?? 'N/A',
                country: candidate.country ?? 'N/A',
                city: candidate.city ?? 'N/A',
                jobTitle: candidate.jobTitle ?? 'N/A',
                companyName: candidate.companyName ?? 'N/A',
                status,
                stage,
                source: candidate.source ?? 'N/A',
                appliedAt: candidate.appliedAt?.toISOString?.() ||
                    candidate.appliedAt ||
                    'N/A',
                rating: candidate.rating ?? 'N/A',
                aiScore: candidate.aiScore ?? 'N/A',
                notes: candidate.notes ?? 'N/A',
            });
        });
        const stream = new stream_1.PassThrough();
        await workbook.xlsx.write(stream);
        return stream;
    }
};
exports.ApplicationsXlsxExporter = ApplicationsXlsxExporter;
exports.ApplicationsXlsxExporter = ApplicationsXlsxExporter = __decorate([
    (0, common_1.Injectable)()
], ApplicationsXlsxExporter);
function getLabel(value, records) {
    const record = records.find((r) => r.value === value);
    return record ? record.label : 'N/A';
}
//# sourceMappingURL=applications-xlsx.exporter.js.map