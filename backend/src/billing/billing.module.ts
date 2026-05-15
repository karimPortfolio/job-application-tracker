import { Module } from '@nestjs/common';
import { Company, CompanySchema } from '../companies/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionsService } from './subscriptions.service';
import { StripeWebhookService } from './stripe-webhook.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SharedStripeModule } from '../shared/stripe.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SharedStripeModule,
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema }
    ]),
    UsersModule
  ],
  exports: [MongooseModule, SubscriptionsService],
  providers: [SubscriptionsService, StripeWebhookService],
  controllers: [SubscriptionsController],
})
export class BillingModule {}
