"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsCsvExporter = void 0;
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const csv_stringify_1 = require("csv-stringify");
let DepartmentsCsvExporter = class DepartmentsCsvExporter {
    export(departments) {
        const stream = new stream_1.PassThrough();
        const csv = (0, csv_stringify_1.stringify)({
            header: true,
            columns: [
                { key: 'title', header: 'Title' },
                { key: 'jobsCount', header: 'Jobs Posted' },
                { key: 'createdAtDiff', header: 'Creation details' },
            ],
        });
        csv.pipe(stream);
        for (const dep of departments) {
            csv.write({
                title: dep.title,
                jobsCount: dep.jobsCount ?? 0,
                createdAtDiff: dep.createdAtDiff || dep.createdAt.toISOString(),
            });
        }
        csv.end();
        return stream;
    }
};
exports.DepartmentsCsvExporter = DepartmentsCsvExporter;
exports.DepartmentsCsvExporter = DepartmentsCsvExporter = __decorate([
    (0, common_1.Injectable)()
], DepartmentsCsvExporter);
//# sourceMappingURL=departments-csv.exporter.js.map