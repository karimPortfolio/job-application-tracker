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
exports.UpdateJobDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateJobDto {
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
    department;
}
exports.UpdateJobDto = UpdateJobDto;
__decorate([
    (0, class_validator_1.ValidateIf)((o, v) => v !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title cannot be empty' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o, v) => v !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o, v) => v !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Country cannot be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['draft', 'published']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o, v) => v !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employment type cannot be empty' }),
    (0, class_validator_1.IsEnum)(['full-time', 'part-time', 'contract', 'internship']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "employmentType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o, v) => v !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Experience level cannot be empty' }),
    (0, class_validator_1.IsEnum)(['junior', 'mid', 'senior', 'lead']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateJobDto.prototype, "isRemote", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateJobDto.prototype, "salaryMin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateJobDto.prototype, "salaryMax", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o, v) => v !== undefined),
    (0, class_validator_1.IsNotEmpty)({ message: 'Department cannot be empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "department", void 0);
//# sourceMappingURL=update-job.dto.js.map