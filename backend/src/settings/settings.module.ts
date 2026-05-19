import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { CompaniesModule } from '../companies/companies.module';
import { BillingModule } from '../billing/billing.module';
import { SettingsService } from './settings.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CompaniesModule,
    BillingModule,
    UsersModule,
  ],
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
