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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsApplicationEmailUniqueConstraint = void 0;
exports.IsApplicationEmailUnique = IsApplicationEmailUnique;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const applications_schema_1 = require("../../applications/applications.schema");
let IsApplicationEmailUniqueConstraint = class IsApplicationEmailUniqueConstraint {
    applicationsModel;
    constructor(applicationsModel) {
        this.applicationsModel = applicationsModel;
    }
    async validate(email, args) {
        const dto = args.object;
        const jobId = dto.job;
        if (!jobId || !email) {
            return true;
        }
        try {
            const existingApplication = await this.applicationsModel.findOne({
                email: email.toLowerCase().trim(),
                job: jobId
            }).lean();
            return !existingApplication;
        }
        catch (error) {
            return false;
        }
    }
    defaultMessage(args) {
        return 'You have already applied for this position with this email address.';
    }
};
exports.IsApplicationEmailUniqueConstraint = IsApplicationEmailUniqueConstraint;
exports.IsApplicationEmailUniqueConstraint = IsApplicationEmailUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsEmailUnique', async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(applications_schema_1.Application.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IsApplicationEmailUniqueConstraint);
function IsApplicationEmailUnique(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsApplicationEmailUniqueConstraint,
        });
    };
}
//# sourceMappingURL=is-application-email-uniqe.validator.js.map