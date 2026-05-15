// subscription.controller.ts
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '../common/guards/CompanyGuard';
import { SubscriptionDuration, SubscriptionPlan } from './enums/subscriptions.enums';

@Controller('subscriptions')
@UseGuards(AuthGuard('jwt'), CompanyGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('checkout')
  async createCheckout(
    @Body() body: { plan: SubscriptionPlan, duration: SubscriptionDuration },
    @Req() req: any
  ) {
    const session = await this.subscriptionsService.createCompanySubscription(
      req.user.company, 
      body.plan,
      body.duration
    );
    
    return { url: session.url };
  }

  @Post('cancel')
  async cancelSubscription(
    @Req() req: any
  ) {
    return await this.subscriptionsService.cancelCompanySubscription(req.user.company);
  }
}