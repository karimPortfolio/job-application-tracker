import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './departments.schema';
import { Company, CompanyDocument } from '../companies/company.schema';
import { Model } from 'mongoose';
import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async findAllByCompany(companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const cacheKey = `company:${companyId}:departments`;
    const cachedDepartments =
      await this.cacheManager.get<Department[]>(cacheKey);
    if (cachedDepartments) {
      return cachedDepartments;
    }

    const departments = await this.departmentModel
      .find({ company: companyId })
      .lean();

    await this.cacheManager.set(cacheKey, departments, 60);

    return departments;
  }

  async createDepartment(dto: CreateDepartmentDto, companyId: string) {
    const company = await this.companyModel.findById(companyId);

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const department = await this.departmentModel.create({
      ...dto,
      company: companyId,
    });

    const cacheKey = `company:${companyId}:departments`;
    await this.cacheManager.del(cacheKey);

    return department;
  }

  async findDepartmentById(departmentId: string, companyId: string) {
    const department = await this.departmentModel.findById(departmentId);

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    if (department.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    return department;
  }

  async updateDepartment(departmentId: string, dto: UpdateDepartmentDto, companyId: string) {
    const department = await this.departmentModel.findById(departmentId);

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    if (department.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    Object.assign(department, dto);
    await department.save();

    const cacheKey = `company:${department.company?.toString()}:departments`;
    await this.cacheManager.del(cacheKey);

    return department;
  }

  async deleteDepartment(departmentId: string, companyId: string) {
    
    const department = await this.departmentModel.findById(departmentId);

    if (!department) {
      throw new BadRequestException('Department not found');
    }

    if (department.company?.toString() !== companyId) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }

    await this.departmentModel.deleteOne({ _id: departmentId });

    const cacheKey = `company:${department.company?.toString()}:departments`;
    await this.cacheManager.del(cacheKey);

    return { message: 'Department deleted successfully' };
  }
}
