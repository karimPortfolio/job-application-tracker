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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueryDto = void 0;
const class_validator_1 = require("class-validator");
class JobQueryDto {
    page;
    limit;
    search;
    department;
    status;
    employmentType;
    experienceLevel;
    isRemote;
    createdAtStart;
    createdAtEnd;
    sortBy;
    sortOrder;
    order;
}
exports.JobQueryDto = JobQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], JobQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], JobQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobQueryDto.prototype, "department", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['draft', 'published', 'closed', 'archived']),
    __metadata("design:type", String)
], JobQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['full-time', 'part-time', 'contract', 'internship']),
    __metadata("design:type", String)
], JobQueryDto.prototype, "employmentType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['junior', 'mid', 'senior', 'lead']),
    __metadata("design:type", String)
], JobQueryDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], JobQueryDto.prototype, "isRemote", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], JobQueryDto.prototype, "createdAtStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], JobQueryDto.prototype, "createdAtEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['createdAt', 'title', 'applicationsCount', 'viewsCount']),
    __metadata("design:type", String)
], JobQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['asc', 'desc']),
    __metadata("design:type", String)
], JobQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['asc', 'desc']),
    __metadata("design:type", String)
], JobQueryDto.prototype, "order", void 0);
//# sourceMappingURL=job-query.dto.js.map