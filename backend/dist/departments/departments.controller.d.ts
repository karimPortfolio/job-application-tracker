import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentQueryDto } from './dto/department-query.dto';
import type { Response } from 'express';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    findAll(req: any, query: DepartmentQueryDto): Promise<any>;
    create(req: any, dto: CreateDepartmentDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./departments.schema").Department, {}, import("mongoose").DefaultSchemaOptions> & import("./departments.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./departments.schema").Department, {}, import("mongoose").DefaultSchemaOptions> & import("./departments.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    exportDepartments(format: "csv" | "xlsx" | undefined, req: any, query: any, res: Response): Promise<void>;
    findById(id: string, req: any): Promise<any>;
    update(id: string, dto: UpdateDepartmentDto, req: any): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./departments.schema").Department, {}, import("mongoose").DefaultSchemaOptions> & import("./departments.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./departments.schema").Department, {}, import("mongoose").DefaultSchemaOptions> & import("./departments.schema").Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
