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
exports.DepartmentSchema = exports.Department = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const date_fns_1 = require("date-fns");
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
let Department = class Department {
    title;
    description;
    company;
    user;
    createdAt;
};
exports.Department = Department;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Department.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Department.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'Company' }),
    __metadata("design:type", String)
], Department.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'User' }),
    __metadata("design:type", String)
], Department.prototype, "user", void 0);
exports.Department = Department = __decorate([
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
], Department);
exports.DepartmentSchema = mongoose_1.SchemaFactory.createForClass(Department);
exports.DepartmentSchema.virtual('createdAtDiff').get(function () {
    const createdAt = this.createdAt ?? this?.createdAt;
    if (!createdAt)
        return null;
    return (0, date_fns_1.formatDistanceToNow)(new Date(createdAt), { addSuffix: true });
});
exports.DepartmentSchema.plugin(mongoose_lean_virtuals_1.default);
exports.DepartmentSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=departments.schema.js.map