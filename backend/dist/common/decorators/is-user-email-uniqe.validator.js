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
exports.IsUserEmailUniqueConstraint = void 0;
exports.IsUserEmailUnique = IsUserEmailUnique;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/user.schema");
let IsUserEmailUniqueConstraint = class IsUserEmailUniqueConstraint {
    usersModel;
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async validate(email) {
        try {
            if (!this.usersModel) {
                return true;
            }
            const user = await this.usersModel.findOne({ email: email });
            return !user;
        }
        catch (error) {
            return true;
        }
    }
    defaultMessage(args) {
        return 'Email $value already exists';
    }
};
exports.IsUserEmailUniqueConstraint = IsUserEmailUniqueConstraint;
exports.IsUserEmailUniqueConstraint = IsUserEmailUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsEmailUnique', async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IsUserEmailUniqueConstraint);
function IsUserEmailUnique(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserEmailUniqueConstraint,
        });
    };
}
//# sourceMappingURL=is-user-email-uniqe.validator.js.map