import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import type { UserDocument } from '../users/user.schema';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateCompanyDto } from './dto/udate-company.dto';
import type { JwtPayload } from '../auth/types/jwt-payload.type';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'company',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto, @CurrentUser() user: JwtPayload) {
    return this.companiesService.create(dto, user);
  }

  @Get()
  show(@CurrentUser() user: UserDocument)
  {
    return this.companiesService.findMyCompany(user);
  }

  @Patch()
  update(@Body() dto: UpdateCompanyDto, @CurrentUser() user: UserDocument)
  {
    return this.companiesService.update(dto, user);
  }
}
