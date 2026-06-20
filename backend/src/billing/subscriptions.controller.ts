// subscription.controller.ts
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CompanyGuard } from '../common/guards/CompanyGuard';
import {
  SubscriptionDuration,
  SubscriptionPlan,
} from './enums/subscriptions.enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EmailVerifiedGuard } from 'src/auth/email-verified.guard';
import { RecruiterRoleGuard } from 'src/common/guards/RecruiterRoleGuard';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard, EmailVerifiedGuard, CompanyGuard, RecruiterRoleGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('checkout')
  async createCheckout(
    @Body() body: { plan: SubscriptionPlan; duration: SubscriptionDuration },
    @Req() req: any,
  ) {
    const session = await this.subscriptionsService.createCompanySubscription(
      req.user.company,
      body.plan,
      body.duration,
    );

    return { url: session.url };
  }
}