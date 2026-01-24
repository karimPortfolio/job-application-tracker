import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { AuthGuard } from "@nestjs/passport";
import { CompanyGuard } from "src/common/guards/CompanyGuard";
import { CreateDepartmentDto } from "./dto/create-department.dto";


@UseGuards(AuthGuard('jwt'), CompanyGuard)
@Controller('departments')
export class DepartmentsController {
    constructor(
        private readonly departmentsService: DepartmentsService,
    ) {}

   @Get()
    async findAll(@Req() req) {
        return this.departmentsService.findAllByCompany(req.companyId);
    }

    @Post()
    async create(@Req() req, @Body() dto: CreateDepartmentDto) {
        return this.departmentsService.createDepartment(dto, req.companyId);
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Req() req) {
        return this.departmentsService.findDepartmentById(id, req.companyId);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto, @Req() req) {
        return this.departmentsService.updateDepartment(id, dto, req.companyId);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req) {
        return this.departmentsService.deleteDepartment(id, req.companyId);
    }

}
