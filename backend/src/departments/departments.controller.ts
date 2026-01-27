import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from 'src/common/guards/CompanyGuard';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentQueryDto } from './dto/department-query.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { Response } from 'express';

@UseGuards(AuthGuard('jwt'), CompanyGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll(@Req() req, @Query() query: DepartmentQueryDto) {
    return this.departmentsService.findAllByCompany(req.companyId, query);
  }

  @Post()
  async create(
    @Req() req,
    @Body() dto: CreateDepartmentDto,
    @CurrentUser() user,
  ) {
    return this.departmentsService.createDepartment(dto, req.companyId, user);
  }

  @Get('export')
  async exportDepartments(
    @Query('format') format: 'csv' | 'xlsx' = 'csv',
    @Req() req,
    @Query() query: any,
    @Res() res: Response,
  ) {
    const stream = await this.departmentsService.exportDepartments(
      req.companyId,
      format,
      query,
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="departments.${format}"`,
    );

    res.setHeader(
      'Content-Type',
      format === 'csv'
        ? 'text/csv'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    stream.pipe(res);
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
