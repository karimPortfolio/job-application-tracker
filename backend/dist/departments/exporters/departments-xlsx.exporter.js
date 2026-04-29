"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsXlsxExporter = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const stream_1 = require("stream");
let DepartmentsXlsxExporter = class DepartmentsXlsxExporter {
    async export(departments) {
        const workbook = new exceljs_1.Workbook();
        const sheet = workbook.addWorksheet('Departments');
        sheet.columns = [
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Jobs Posted', key: 'jobsCount', width: 15 },
            { header: 'Creation details', key: 'createdAtDiff', width: 25 },
        ];
        departments.forEach((dep) => {
            sheet.addRow({
                title: dep.title,
                jobsCount: dep.jobsCount ?? 0,
                createdAtDiff: dep.createdAtDiff || dep.createdAt.toISOString(),
            });
        });
        const stream = new stream_1.PassThrough();
        await workbook.xlsx.write(stream);
        return stream;
    }
};
exports.DepartmentsXlsxExporter = DepartmentsXlsxExporter;
exports.DepartmentsXlsxExporter = DepartmentsXlsxExporter = __decorate([
    (0, common_1.Injectable)()
], DepartmentsXlsxExporter);
//# sourceMappingURL=departments-xlsx.exporter.js.map