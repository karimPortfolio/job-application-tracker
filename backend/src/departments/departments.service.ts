import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './departments.schema';
import { Company, CompanyDocument } from '../companies/company.schema';
import { Types, type Model, type PaginateModel } from 'mongoose';
import { formatDistanceToNow } from 'date-fns';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentQueryDto } from './dto/department-query.dto';
import { buildDepartmentFilter } from './filters/department.filters';
import { buildDepartmentSort } from './filters/department.sort';
import { User, UserDocument } from '../users/user.schema';
import { Job, JobDocument } from '../jobs/jobs.schema';
import { DepartmentWithJobsCount } from './types/departments.types';
import { DepartmentsCsvExporter } from './exporters/departments-csv.exporter';
import { DepartmentsXlsxExporter } from './exporters/departments-xlsx.exporter';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: PaginateModel<DepartmentDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private readonly csvExporter: DepartmentsCsvExporter,
    private readonly xlsxExporter: DepartmentsXlsxExporter,
    @Inject('CACHE_MANAGER') private cache: any,
  ) {}

  async findAllByCompany(companyId: string, query: DepartmentQueryDto) {
    const company = await this.getCompanyOrThrow(companyId);

    const departments = await this.fetchPaginatedDepartments(company, query);

    if (departments.docs.length === 0) return departments;

    const departmentIds: string[] = departments.docs.map((d) =>
      d._id.toString(),
    );

    const jobsCountMap = await this.getJobsCountMap(companyId, departmentIds);

    departments.docs = departments.docs.map((dep) => ({
      ...dep,
      jobsCount: jobsCountMap[dep._id.toString()] ?? 0,
      createdAtDiff:
        (dep as any).createdAtDiff ??
        (dep.createdAt
          ? formatDistanceToNow(new Date(dep.createdAt), { addSuffix: true })
          : null),
    }));

    return departments;
  }

  async createDepartment(
    dto: CreateDepartmentDto,
    companyId: string,
    user: { sub: string },
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const userId = await this.getUserorThrow(user.sub);

    const department = await this.departmentModel.create({
      ...dto,
      company: company,
      user: userId,
    });

    return department;
  }

  async findDepartmentById(departmentId: string, companyId: string) {
    const chachedDepartment = await this.getChachedDepartment(
      departmentId,
      companyId,
    );

    if (chachedDepartment) {
      return chachedDepartment;
    }

    const department = await this.departmentModel.findById(departmentId);

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    if (department.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.cache.set(this.getCacheKey(departmentId), department, 60 * 1000); //60s

    return department;
  }

  async updateDepartment(
    departmentId: string,
    dto: UpdateDepartmentDto,
    companyId: string,
  ) {
    const department = await this.departmentModel.findOne({
      _id: departmentId,
      company: companyId,
    });

    if (!department) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.departmentModel.updateOne({ _id: departmentId }, { $set: dto });

    const updatedDepartment =
      await this.departmentModel.findById(departmentId);

    await this.cache.set(
      this.getCacheKey(departmentId),
      updatedDepartment,
      60 * 1000,
    ); //60s

    return updatedDepartment;
  }

  async deleteDepartment(departmentId: string, companyId: string) {
    const department = await this.departmentModel.findOne({
      _id: departmentId,
      company: companyId,
    });

    if (!department) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.departmentModel.deleteOne({ _id: departmentId });

    await this.cache.del(this.getCacheKey(departmentId));

    return { message: 'Department deleted successfully' };
  }

  async exportDepartments(
    companyId: string,
    format: 'csv' | 'xlsx',
    query: any,
  ) {
    const company = await this.getCompanyOrThrow(companyId);
    const departments = await this.getDepartmentsForExport(company, query);

    if (format === 'xlsx') {
      return this.xlsxExporter.export(departments);
    }

    return this.csvExporter.export(departments);
  }

  private async getChachedDepartment(departmentId: string, companyId: string) {
    const chachedDepartment = await this.cache.get(
      this.getCacheKey(departmentId),
    );

    if (!chachedDepartment) {
      return null;
    }

    if (chachedDepartment.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    return chachedDepartment;
  }

  private async getDepartmentsForExport(company: string, query: any) {
    return this.departmentModel
      .find(buildDepartmentFilter(company, query))
      .lean();
  }

  private async getCompanyOrThrow(companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new BadRequestException('Company not found');

    return companyId;
  }

  private async getUserorThrow(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    return userId;
  }

  private async fetchPaginatedDepartments(
    company: string,
    query: DepartmentQueryDto,
  ) {
    return this.departmentModel.paginate(
      buildDepartmentFilter(company, query),
      {
        page: query.page || 1,
        limit: Math.min(query.limit || 10, 50),
        sort: buildDepartmentSort(query.sortBy, query.order),
        populate: [{ path: 'user', select: 'name' }],
        lean: true,
        leanVirtuals: true,
      },
    ) as any;
  }

  private async getJobsCountMap(
    companyId: string,
    departmentIds: string[],
  ): Promise<Record<string, number>> {
    const counts = await this.jobModel.aggregate([
      {
        $match: {
          department: { $in: departmentIds },
          status: { $in: ['published', 'closed'] },
          company: companyId,
        },
      },
      { $group: { _id: '$department', count: { $sum: 1 } } },
    ]);

    return Object.fromEntries(counts.map((j) => [j._id.toString(), j.count]));
  }

  private getCacheKey(departmentId: string) {
    return `department:${departmentId}`;
  }
}
