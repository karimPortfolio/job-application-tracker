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
exports.CompaniesService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const company_schema_1 = require("./company.schema");
const user_schema_1 = require("../users/user.schema");
let CompaniesService = class CompaniesService {
    companyModel;
    userModel;
    cache;
    constructor(companyModel, userModel, cache) {
        this.companyModel = companyModel;
        this.userModel = userModel;
        this.cache = cache;
    }
    cacheKey(companyId) {
        return `company:${companyId}`;
    }
    async create(dto, user) {
        const existingUser = await this.userModel.findById(user.sub);
        if (!existingUser)
            throw new common_1.ForbiddenException('User not found');
        if (existingUser.company)
            throw new common_1.ForbiddenException('User already belongs to a company');
        const company = await this.companyModel.create(dto);
        await this.userModel.findByIdAndUpdate(user.sub, { company: company._id });
        return {
            company,
            user
        };
    }
    async findMyCompany(user) {
        let companyId = user.company;
        if (!companyId) {
            const dbUser = await this.userModel.findById(user.sub).lean();
            companyId = dbUser?.company;
        }
        if (!companyId)
            return null;
        const key = this.cacheKey(companyId.toString());
        const cached = await this.cache.get(key);
        if (cached)
            return cached;
        const company = await this.companyModel.findById(companyId).lean();
        if (company) {
            await this.cache.set(key, company, 60 * 1000);
        }
        return company;
    }
    async update(dto, user) {
        let companyId = user.company;
        const company = await this.companyModel
            .findByIdAndUpdate(companyId, dto, {
            new: true,
        })
            .lean();
        if (company) {
            await this.cache.set(this.cacheKey(companyId.toString()), company, 60 * 1000);
        }
        return company;
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map