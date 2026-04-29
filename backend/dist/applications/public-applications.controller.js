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
exports.PublicApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const applications_service_1 = require("./applications.service");
const public_decorator_1 = require("../common/decorators/public.decorator");
const throttler_1 = require("@nestjs/throttler");
const create_public_application_dto_1 = require("./dto/create-public-application.dto");
const google_recaptcha_1 = require("@nestlab/google-recaptcha");
let PublicApplicationsController = class PublicApplicationsController {
    applicationsService;
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    async createPublicApplication(createApplicationDto, file) {
        return this.applicationsService.createPublicApplication(createApplicationDto, file);
    }
    async parseResume(file) {
        return this.applicationsService.parseCandidateResume(file);
    }
};
exports.PublicApplicationsController = PublicApplicationsController;
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, google_recaptcha_1.Recaptcha)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume', { storage: (0, multer_1.memoryStorage)() })),
    (0, common_1.Post)(),
    (0, throttler_1.Throttle)({ default: { ttl: 60, limit: 5 } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        exceptionFactory: (error) => {
            throw new common_1.HttpException('The resume is required and must be a PDF file not exceeding 5MB in size.', common_1.HttpStatus.BAD_REQUEST);
        },
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5242880 }),
            new common_1.FileTypeValidator({ fileType: 'application/pdf' }),
        ],
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_public_application_dto_1.CreatePublicApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], PublicApplicationsController.prototype, "createPublicApplication", null);
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume', { storage: (0, multer_1.memoryStorage)() })),
    (0, common_1.Post)("parse-resume"),
    (0, throttler_1.Throttle)({ default: { ttl: 60, limit: 5 } }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        exceptionFactory: (error) => {
            throw new common_1.HttpException('The resume is required and must be a PDF file not exceeding 5MB in size.', common_1.HttpStatus.BAD_REQUEST);
        },
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5242880 }),
            new common_1.FileTypeValidator({ fileType: 'application/pdf' }),
        ],
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicApplicationsController.prototype, "parseResume", null);
exports.PublicApplicationsController = PublicApplicationsController = __decorate([
    (0, common_1.Controller)('public-applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], PublicApplicationsController);
//# sourceMappingURL=public-applications.controller.js.map