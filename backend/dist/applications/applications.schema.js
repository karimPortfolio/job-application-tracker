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
exports.ApplicationSchema = exports.Application = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const formatDistanceToNow_1 = require("date-fns/formatDistanceToNow");
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
let Application = class Application {
    fullName;
    email;
    phoneNumber;
    linkedInUrl;
    githubUrl;
    portfolioUrl;
    resumeUrl;
    country;
    city;
    job;
    company;
    status;
    stage;
    source;
    referalName;
    referalEmail;
    appliedAt;
    notes;
    rating;
    aiScore;
    aiSummary;
    aiDecision;
    user;
    archivedAt;
    viewedAt;
    rejectedAt;
    createdAt;
};
exports.Application = Application;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "linkedInUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "githubUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "portfolioUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "resumeUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Job' }),
    __metadata("design:type", String)
], Application.prototype, "job", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Company' }),
    __metadata("design:type", String)
], Application.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected'],
        default: 'applied',
    }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: [
            'screening',
            'technical_interview',
            'hr_interview',
            'final_interview',
            'offer',
        ],
        default: 'screening',
    }),
    __metadata("design:type", String)
], Application.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "referalName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "referalEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Application.prototype, "appliedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Application.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Application.prototype, "aiScore", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "aiSummary", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Application.prototype, "aiDecision", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User' }),
    __metadata("design:type", Object)
], Application.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Application.prototype, "archivedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Application.prototype, "viewedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Application.prototype, "rejectedAt", void 0);
exports.Application = Application = __decorate([
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
], Application);
exports.ApplicationSchema = mongoose_1.SchemaFactory.createForClass(Application);
exports.ApplicationSchema.plugin(mongoose_lean_virtuals_1.default);
exports.ApplicationSchema.virtual('createdAtDiff').get(function () {
    const createdAt = this.createdAt ?? this?.createdAt;
    if (!createdAt)
        return null;
    return (0, formatDistanceToNow_1.formatDistanceToNow)(new Date(createdAt), { addSuffix: true });
});
exports.ApplicationSchema.index({ company: 1, job: 1 });
exports.ApplicationSchema.index({ email: 1, job: 1 }, { unique: true });
exports.ApplicationSchema.index({ status: 1, appliedAt: -1 });
exports.ApplicationSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=applications.schema.js.map