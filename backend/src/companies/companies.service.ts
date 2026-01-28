import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Cache } from 'cache-manager';
import { Company, CompanyDocument } from './company.schema';
import { User, UserDocument } from '../users/user.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  private cacheKey(companyId: string) {
    return `company:${companyId}`;
  }

  async create(dto: CreateCompanyDto, user: { sub: string }) {
    const existingUser = await this.userModel.findById(user.sub);

    if (!existingUser) throw new ForbiddenException('User not found');

    if (existingUser.company) throw new ForbiddenException('User already belongs to a company');

    const company = await this.companyModel.create(dto);

    await this.userModel.findByIdAndUpdate(user.sub, { company: company._id });

    return company;
  }

  async findMyCompany(user: any) {
    let companyId = user.company;

    if (!companyId) {
      const dbUser = await this.userModel.findById(user.sub).lean();
      companyId = dbUser?.company;
    }

    if (!companyId) return null;

    const key = this.cacheKey(companyId.toString());

    const cached = await this.cache.get<Company>(key);
    console.log('cached company:', cached);
    if (cached) return cached;

    const company = await this.companyModel.findById(companyId).lean();

    if (company) {
      await this.cache.set(key, company, 60 * 1000); // 60s
    }

    return company;
  }

  async update(dto: UpdateCompanyDto, user: any) {
    let companyId = user.company;

    if (!companyId) {
      const dbUser = await this.userModel.findById(user.sub).lean();
      companyId = dbUser?.company;
    }

    if (!companyId) throw new ForbiddenException('User has no company.');

    const company = await this.companyModel
      .findByIdAndUpdate(companyId, dto, {
        new: true,
      })
      .lean();

    if (company) {
      await this.cache.set(
        this.cacheKey(companyId.toString()),
        company,
        60 * 1000,
      );
    }

    return company;
  }
}
