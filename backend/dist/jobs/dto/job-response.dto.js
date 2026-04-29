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
exports.JobResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const capitalize_1 = require("../../common/utils/capitalize");
class JobResponseDto {
    id;
    title;
    description;
    country;
    city;
    status;
    employmentType;
    experienceLevel;
    isRemote;
    salaryMin;
    salaryMax;
    applicationsCount;
    viewsCount;
    user;
    department;
    createdAt;
    createdAtDiff;
}
exports.JobResponseDto = JobResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, capitalize_1.capitalize)(value)),
    __metadata("design:type", String)
], JobResponseDto.prototype, "country", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, capitalize_1.capitalize)(value)),
    __metadata("design:type", String)
], JobResponseDto.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, capitalize_1.capitalize)(value)),
    __metadata("design:type", String)
], JobResponseDto.prototype, "employmentType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, capitalize_1.capitalize)(value)),
    __metadata("design:type", String)
], JobResponseDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], JobResponseDto.prototype, "isRemote", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "salaryMin", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "salaryMax", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "applicationsCount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], JobResponseDto.prototype, "viewsCount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], JobResponseDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], JobResponseDto.prototype, "department", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], JobResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], JobResponseDto.prototype, "createdAtDiff", void 0);
//# sourceMappingURL=job-response.dto.js.map