import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import type { UserDocument } from '../users/user.schema';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateCompanyDto } from './dto/update-company.dto';
import type { JwtPayload } from '../auth/types/jwt-payload.type';
import { EmailVerifiedGuard } from '../auth/email-verified.guard';

@UseGuards(JwtAuthGuard, EmailVerifiedGuard)
@Controller({
  path: 'company',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto, @CurrentUser() user: JwtPayload, @Req() req) {
    const { company, user: UpdatedUser } = await this.companiesService.create(dto, user);
    req.user = UpdatedUser;
    return company;
  }

  @Get()
  show(@CurrentUser() user: UserDocument)
  {
    return this.companiesService.findMyCompany(user);
  }
}
