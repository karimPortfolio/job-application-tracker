import { Department, DepartmentDocument } from './departments.schema';
import { CompanyDocument } from '../companies/company.schema';
import { Types, type Model, type PaginateModel } from 'mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentQueryDto } from './dto/department-query.dto';
import { UserDocument } from '../users/user.schema';
import { JobDocument } from '../jobs/jobs.schema';
import { DepartmentsCsvExporter } from './exporters/departments-csv.exporter';
import { DepartmentsXlsxExporter } from './exporters/departments-xlsx.exporter';
export declare class DepartmentsService {
    private readonly departmentModel;
    private companyModel;
    private userModel;
    private jobModel;
    private readonly csvExporter;
    private readonly xlsxExporter;
    private cache;
    constructor(departmentModel: PaginateModel<DepartmentDocument>, companyModel: Model<CompanyDocument>, userModel: Model<UserDocument>, jobModel: Model<JobDocument>, csvExporter: DepartmentsCsvExporter, xlsxExporter: DepartmentsXlsxExporter, cache: any);
    findAllByCompany(companyId: string, query: DepartmentQueryDto): Promise<any>;
    createDepartment(dto: CreateDepartmentDto, companyId: string, user: {
        sub: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Department, {}, import("mongoose").DefaultSchemaOptions> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Department, {}, import("mongoose").DefaultSchemaOptions> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findDepartmentById(departmentId: string, companyId: string): Promise<any>;
    updateDepartment(departmentId: string, dto: UpdateDepartmentDto, companyId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Department, {}, import("mongoose").DefaultSchemaOptions> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Department, {}, import("mongoose").DefaultSchemaOptions> & Department & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    deleteDepartment(departmentId: string, companyId: string): Promise<{
        message: string;
    }>;
    exportDepartments(companyId: string, format: 'csv' | 'xlsx', query: any): Promise<import("stream").PassThrough>;
    private getChachedDepartment;
    private getDepartmentsForExport;
    private getCompanyOrThrow;
    private getUserorThrow;
    private fetchPaginatedDepartments;
    private getJobsCountMap;
    private getCacheKey;
}
