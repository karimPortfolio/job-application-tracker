import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmailVerifiedGuard } from '../auth/email-verified.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CompaniesService } from '../companies/companies.service';
import { UpdateCompanyDto } from '../companies/dto/update-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyGuard } from 'src/common/guards/CompanyGuard';
import { SubscriptionsService } from 'src/billing/subscriptions.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { SettingsService } from './settings.service';
import { RecruiterRoleGuard } from 'src/common/guards/RecruiterRoleGuard';

@UseGuards(JwtAuthGuard, EmailVerifiedGuard, CompanyGuard, RecruiterRoleGuard)
@Controller({
  path: 'settings',
  version: '1',
})
export class SettingsController {
  constructor(
    @Inject() private settingsService: SettingsService,
    @Inject() private companiesService: CompaniesService,
    @Inject() private subscriptionsService: SubscriptionsService,
  ) {}
  @Patch('company')
  async UpdateCompany(
    @Body() dto: UpdateCompanyDto,
    @CurrentUser() user: { sub: string; company: string },
  ) {
    await this.companiesService.update(dto, user);
  }

  @Get("company/billing")
  async billingDetails(
    @Req() req: any
  ) {
    return await this.subscriptionsService.getCompanyBillingDetails(req.user.company);
  }

  @Post('company/billing/cancel')
  async cancelSubscription(@Req() req: any) {
    return await this.subscriptionsService.cancelCompanySubscription(
      req.user.company,
    );
  }

  @Patch('preferences')
  async updatePreferences(
    @Body() dto: UpdatePreferencesDto,
    @CurrentUser() user: { sub: string },
  ) {
    return await this.settingsService.updatePreferences(dto, user);
  }
}
