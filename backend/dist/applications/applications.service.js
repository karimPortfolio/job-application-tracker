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
var ApplicationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const applications_csv_exporter_1 = require("./exporters/applications-csv.exporter");
const applications_xlsx_exporter_1 = require("./exporters/applications-xlsx.exporter");
const s3_uploader_1 = require("../common/utils/s3-uploader");
const applications_schema_1 = require("./applications.schema");
const applications_filters_1 = require("./filters/applications.filters");
const applications_sort_1 = require("./filters/applications.sort");
const fileParser_1 = require("../common/utils/fileParser");
const candidate_resume_parsing_prompt_1 = require("../ai/prompts/candidate-resume-parsing.prompt");
const ai_service_1 = require("../ai/ai.service");
const application_rating_prompt_1 = require("../ai/prompts/application-rating.prompt");
const event_emitter_1 = require("@nestjs/event-emitter");
let ApplicationsService = ApplicationsService_1 = class ApplicationsService {
    applicationModel;
    companyModel;
    jobModel;
    userModel;
    aiService;
    csvExporter;
    xlsxExporter;
    s3Uploader;
    eventEmitter;
    cache;
    constructor(applicationModel, companyModel, jobModel, userModel, aiService, csvExporter, xlsxExporter, s3Uploader, eventEmitter, cache) {
        this.applicationModel = applicationModel;
        this.companyModel = companyModel;
        this.jobModel = jobModel;
        this.userModel = userModel;
        this.aiService = aiService;
        this.csvExporter = csvExporter;
        this.xlsxExporter = xlsxExporter;
        this.s3Uploader = s3Uploader;
        this.eventEmitter = eventEmitter;
        this.cache = cache;
    }
    logger = new common_1.Logger(ApplicationsService_1.name);
    async getCompanyApplications(companyId, query) {
        const company = await this.getCompanyOrThrow(companyId);
        const filter = (0, applications_filters_1.buildApplicationFilter)(company, query);
        const sort = (0, applications_sort_1.buildApplicationSort)(query);
        return this.applicationModel.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort,
            populate: [
                {
                    path: 'job',
                    select: 'title',
                    populate: { path: 'department', select: 'title' },
                },
                { path: 'user', select: 'name' },
            ],
            lean: true,
            leanWithVirtuals: true,
        });
    }
    async createApplication(companyId, user, dto, file) {
        const company = await this.getCompanyOrThrow(companyId);
        const userFound = await this.getUserOrThrow(user.sub);
        const job = await this.getJobOrThrow(dto.job);
        let resumeUrl = dto.resumeUrl;
        if (file && this.s3Uploader.isS3Configured()) {
            resumeUrl = await this.uploadResumeToS3(companyId, dto.email, file);
        }
        if (dto.appliedAt && new Date(dto.appliedAt) > new Date()) {
            throw new common_1.UnprocessableEntityException({
                message: 'Validation failed',
                errors: [
                    {
                        field: 'appliedAt',
                        errors: ['Applied date cannot be in the future'],
                    },
                ],
            });
        }
        const application = await this.applicationModel.create({
            fullName: dto.fullName,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            linkedInUrl: dto.linkedInUrl,
            resumeUrl,
            country: dto.country,
            city: dto.city,
            job: job,
            status: dto.status || 'applied',
            stage: dto.stage || 'screening',
            source: dto.source,
            referalName: dto.referalName,
            referalEmail: dto.referalEmail,
            appliedAt: dto.appliedAt ?? new Date().toISOString(),
            company: company,
            user: userFound.id,
        });
        this.jobModel
            .updateOne({ _id: job }, { $inc: { applicationsCount: 1 } })
            .exec();
        return application;
    }
    async createPublicApplication(dto, file) {
        let resumeUrl = dto.resumeUrl;
        if (file && this.s3Uploader.isS3Configured()) {
            resumeUrl = await this.uploadResumeToS3('public', dto.email, file);
        }
        const job = await this.jobModel.findById(dto.job);
        if (!job) {
            throw new common_1.BadRequestException('Job not found');
        }
        const existingApplication = await this.applicationModel
            .findOne({
            email: dto.email.toLowerCase().trim(),
            job: dto.job,
        })
            .lean();
        if (existingApplication) {
            throw new common_1.BadRequestException({
                message: 'You have already applied for this job.',
            });
        }
        const company = job.company
            ? typeof job.company === 'string'
                ? job.company
                : job.company._id
            : undefined;
        const application = await this.applicationModel.create({
            fullName: dto.fullName,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            linkedInUrl: dto.linkedInUrl,
            portfolioUrl: dto.portfolioUrl,
            resumeUrl,
            country: dto.country,
            city: dto.city,
            job: dto.job,
            status: 'applied',
            stage: 'screening',
            source: dto.source,
            company,
            appliedAt: dto.appliedAt ?? new Date().toISOString(),
        });
        this.jobModel
            .updateOne({ _id: job._id }, { $inc: { applicationsCount: 1 } })
            .exec();
        const user = await this.getUserOrThrow(job.user);
        this.eventEmitter.emit('application.created', {
            user: user,
            jobTitle: job.title,
            application
        });
        return application;
    }
    async getApplicationById(applicationId, companyId) {
        const cachedApplication = await this.getCachedApplication(applicationId, companyId);
        if (cachedApplication)
            return cachedApplication;
        const application = await this.applicationModel
            .findById(applicationId)
            .populate([{ path: 'job', select: 'title' }]);
        if (!application)
            throw new common_1.BadRequestException('Application not found');
        if (application.company?.toString() !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await this.cache.set(this.getCacheKey(applicationId), application, 60 * 1000);
        return application;
    }
    async updateApplication(applicationId, companyId, dto, file) {
        const application = await this.applicationModel.findOne({
            _id: applicationId,
            company: companyId,
        });
        if (!application)
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        let resumeUrl = application.resumeUrl;
        if (file && this.s3Uploader.isS3Configured()) {
            await this.deleteResumeFromS3(resumeUrl || '');
            resumeUrl = await this.uploadResumeToS3(companyId, dto.email, file);
        }
        dto.resumeUrl = resumeUrl;
        await this.applicationModel.updateOne({ _id: applicationId }, { $set: dto });
        const updatedApplication = await this.applicationModel.findById(applicationId);
        await this.cache.set(this.getCacheKey(applicationId), updatedApplication, 60 * 1000);
        return updatedApplication;
    }
    async deleteApplication(applicationId, companyId) {
        const application = await this.applicationModel.findOne({
            _id: applicationId,
            company: companyId,
        });
        if (!application)
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        if (application.resumeUrl) {
            await this.deleteResumeFromS3(application.resumeUrl);
        }
        const job = application.job?.toString() || '';
        await this.applicationModel.deleteOne({ _id: applicationId });
        if (job) {
            await this.jobModel.updateOne({ _id: job }, { $inc: { applicationsCount: -1 } });
        }
        await this.cache.del(this.getCacheKey(applicationId));
        return { message: 'Application deleted successfully' };
    }
    async exportApplications(companyId, format, query) {
        const company = await this.getCompanyOrThrow(companyId);
        const filter = (0, applications_filters_1.buildApplicationFilter)(company, query);
        const sort = (0, applications_sort_1.buildApplicationSort)(query);
        const applications = await this.applicationModel
            .find(filter)
            .sort(sort)
            .populate([
            { path: 'job', select: 'title' },
            { path: 'company', select: 'name' },
        ])
            .lean();
        const exportRows = applications.map((application) => ({
            ...application,
            jobTitle: application?.job?.title ?? '',
            companyName: application?.company?.name ?? '',
        }));
        if (format === 'xlsx') {
            return this.xlsxExporter.export(exportRows);
        }
        return this.csvExporter.export(exportRows);
    }
    async updateApplicationStatus(applicationId, companyId, status) {
        const application = await this.applicationModel.findById(applicationId);
        if (!application)
            throw new common_1.BadRequestException('Application not found');
        if (application.company?.toString() !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await this.applicationModel.updateOne({ _id: applicationId }, { $set: { status } });
        const updatedApplication = await this.applicationModel.findById(applicationId);
        await this.cache.set(this.getCacheKey(applicationId), updatedApplication, 60 * 1000);
        return updatedApplication;
    }
    async updateApplicationStage(applicationId, companyId, stage) {
        const application = await this.applicationModel.findById(applicationId);
        if (!application)
            throw new common_1.BadRequestException('Application not found');
        if (application.company !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        await this.applicationModel.updateOne({ _id: applicationId }, { $set: { stage } });
        const updatedApplication = await this.applicationModel.findById(applicationId);
        await this.cache.set(this.getCacheKey(applicationId), updatedApplication, 60 * 1000);
        return updatedApplication;
    }
    async getApplicationsJobs(companyId) {
        const company = await this.getCompanyOrThrow(companyId);
        const cachedJobs = await this.cache.get(this.getApplicationsJobsCacheKey(company));
        if (cachedJobs) {
            return cachedJobs;
        }
        const jobs = await this.jobModel
            .find({
            company: company,
            status: {
                $in: ['published', 'closed'],
            },
        })
            .select('title');
        await this.cache.set(this.getApplicationsJobsCacheKey(company), jobs, 60 * 1000);
        return jobs;
    }
    async parseCandidateResume(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const content = await (0, fileParser_1.parseFileContent)(file);
        if (!content) {
            throw new common_1.BadRequestException('Unable to parse file content');
        }
        const email = content.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
        const phone = content.match(/(\+?\d{1,3})?[\s.-]?\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}/)?.[0];
        const prompt = (0, candidate_resume_parsing_prompt_1.buildCandidateResumeParsingPrompt)(content, email, phone);
        const candidateInfo = await this.aiService.run({
            prompt,
            temperature: 0.2,
            maxTokens: 600,
            feature: 'generic',
        });
        const cleaned = this.getCleanedAiResponse(candidateInfo);
        const parsedResponse = this.parsedAiResponse(cleaned);
        return {
            fullName: parsedResponse.fullName ?? null,
            email: parsedResponse.contactInformation?.email ??
                parsedResponse.email ??
                null,
            phone: parsedResponse.contactInformation?.phoneNumber ??
                parsedResponse.phone ??
                null,
            linkedin: parsedResponse.links?.linkedin ?? null,
            github: parsedResponse.links?.github ?? null,
            portfolio: parsedResponse.links?.portfolio ?? null,
            country: parsedResponse.location?.country ?? null,
            city: parsedResponse.location?.city ?? null,
        };
    }
    async runningSmartScreening(applicationId, companyId) {
        const application = await this.applicationModel.findById(applicationId).populate('job');
        if (!application)
            throw new common_1.BadRequestException('Application not found');
        if (application.company?.toString() !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        if (!application.job) {
            throw new common_1.BadRequestException('Associated job not found');
        }
        const jobDescription = application.job?.description || '';
        const resumeStream = await this.getFileFromS3(application.resumeUrl || '');
        if (!resumeStream) {
            throw new common_1.BadRequestException('Resume file not found');
        }
        const mimeType = this.getFileMimetypeFromUrl(application.resumeUrl || '');
        resumeStream.mimetype = mimeType;
        const resumeText = await (0, fileParser_1.parseFileContent)(resumeStream);
        const prompt = (0, application_rating_prompt_1.buildApplicationRatingPrompt)(jobDescription, resumeText);
        const aiResponse = await this.aiService.run({
            prompt,
            temperature: 0.2,
            maxTokens: 600,
            feature: 'generic',
        });
        const parsedAiResponse = this.parsedAiResponse(this.getCleanedAiResponse(aiResponse) || '{}');
        await this.applicationModel.updateOne({ _id: applicationId }, { $set: {
                aiScore: parsedAiResponse.score,
                aiSummary: parsedAiResponse.summary,
                aiDecision: parsedAiResponse.decision,
            } });
        this.cache.del(this.getCacheKey(applicationId));
        return parsedAiResponse;
    }
    async getCachedApplication(applicationId, companyId) {
        const cachedApplication = await this.cache.get(this.getCacheKey(applicationId));
        if (!cachedApplication)
            return null;
        if (cachedApplication.company !== companyId.toString()) {
            throw new common_1.ForbiddenException('Access to this resource is forbidden');
        }
        return cachedApplication;
    }
    getCacheKey(applicationId) {
        return `application:${applicationId}`;
    }
    getApplicationsJobsCacheKey(companyId) {
        return `${companyId}:applications:jobs`;
    }
    getCleanedAiResponse(response) {
        const firstBrace = response.indexOf('{');
        const lastBrace = response.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1)
            return null;
        return response.slice(firstBrace, lastBrace + 1);
    }
    parsedAiResponse(response) {
        let parsed;
        try {
            parsed = JSON.parse(response);
        }
        catch (err) {
            throw new Error('Invalid AI JSON response');
        }
        return parsed;
    }
    async getCompanyOrThrow(companyId) {
        const company = await this.companyModel.findById(companyId);
        if (!company)
            throw new common_1.BadRequestException('Company not found');
        return companyId;
    }
    async uploadResumeToS3(companyId, email, file) {
        return this.s3Uploader.upload({
            file,
            keyPrefix: `applications/resumes/${companyId}`,
            metadata: { email: email || '' },
            acl: 'private',
            errMessage: 'Resume is required and must be a valid file',
        });
    }
    async deleteResumeFromS3(resumeUrl) {
        if (!this.s3Uploader.isS3Configured())
            return;
        const url = new URL(resumeUrl);
        const key = url.pathname.substring(1);
        return await this.s3Uploader.delete(key);
    }
    async getFileFromS3(resumeUrl) {
        if (!this.s3Uploader.isS3Configured())
            return null;
        const url = new URL(resumeUrl);
        const key = url.pathname.substring(1);
        return await this.s3Uploader.getFileStream(key);
    }
    getFileMimetypeFromUrl(fileUrl) {
        const fileExtension = (fileUrl || '')
            .split('.')
            .pop()
            ?.toLowerCase() || 'pdf';
        const mimeTypeMap = {
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            txt: 'text/plain',
        };
        return mimeTypeMap[fileExtension] || 'application/pdf';
    }
    async getUserOrThrow(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return user;
    }
    async getJobOrThrow(jobId) {
        const job = await this.jobModel.findById(jobId);
        if (!job)
            throw new common_1.BadRequestException('Job not found');
        return jobId;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = ApplicationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(applications_schema_1.Application.name)),
    __param(1, (0, mongoose_1.InjectModel)('Company')),
    __param(2, (0, mongoose_1.InjectModel)('Job')),
    __param(3, (0, mongoose_1.InjectModel)('User')),
    __param(4, (0, common_1.Inject)()),
    __param(9, (0, common_1.Inject)('CACHE_MANAGER')),
    __metadata("design:paramtypes", [Object, mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        ai_service_1.AIService,
        applications_csv_exporter_1.ApplicationsCsvExporter,
        applications_xlsx_exporter_1.ApplicationsXlsxExporter,
        s3_uploader_1.S3Uploader,
        event_emitter_1.EventEmitter2, Object])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map