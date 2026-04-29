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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSchema = exports.Job = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const date_fns_1 = require("date-fns");
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
let Job = class Job {
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
    company;
    department;
    user;
    createdAt;
};
exports.Job = Job;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['draft', 'published', 'closed', 'archived'],
        default: 'draft',
    }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "employmentType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "experienceLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "isRemote", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Job.prototype, "salaryMin", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Job.prototype, "salaryMax", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Job.prototype, "applicationsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Job.prototype, "viewsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Company' }),
    __metadata("design:type", Object)
], Job.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Department' }),
    __metadata("design:type", Object)
], Job.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User' }),
    __metadata("design:type", Object)
], Job.prototype, "user", void 0);
exports.Job = Job = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            virtuals: true,
        },
    })
], Job);
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
exports.JobSchema.plugin(mongoose_lean_virtuals_1.default);
exports.JobSchema.virtual('createdAtDiff').get(function () {
    const createdAt = this.createdAt ?? this?.createdAt;
    if (!createdAt)
        return null;
    return (0, date_fns_1.formatDistanceToNow)(new Date(createdAt), { addSuffix: true });
});
exports.JobSchema.index({ company: 1, status: 1 });
exports.JobSchema.index({ company: 1, department: 1 });
exports.JobSchema.index({ status: 1, createdAt: -1 });
exports.JobSchema.set('toJSON', { virtuals: true });
exports.JobSchema.set('toObject', { virtuals: true });
exports.JobSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=jobs.schema.js.map