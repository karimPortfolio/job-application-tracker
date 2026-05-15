import { Injectable } from '@nestjs/common';
import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Company } from '../companies/company.schema';
import {
  SubscriptionCredits,
  SubscriptionDuration,
  SubscriptionPlan,
  SubscriptionStatus,
} from './enums/subscriptions.enums';

@Injectable()
export class StripeWebhookService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectStripeClient() private readonly stripe: Stripe,
  ) {}

  @StripeWebhookHandler('checkout.session.completed')
  async handleCheckout(event: Stripe.Event) {
    console.log('Stripe Webhook: checkout session completed');
    const session = event.data.object as Stripe.Checkout.Session;
    const subscription = await this.getSubscription(
      session.subscription as string,
    );

    const expiringDate = this.getExpiringDate(subscription, session);
    const credits = SubscriptionCredits[`${session.metadata?.subscriptionPlan}_${session.metadata?.duration}` as keyof typeof SubscriptionCredits] || 0;

    await this.companyModel.findByIdAndUpdate(session.metadata?.companyId, {
      stripeSubscriptionId: session.subscription as string,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      plan: session.metadata?.subscriptionPlan as SubscriptionPlan,
      duration: session.metadata?.duration as SubscriptionDuration,
      subscriptionExpiresAt: expiringDate,
      aiFeaturesCredits: credits,
    });
  }

  @StripeWebhookHandler('customer.subscription.deleted')
  async handleCancellation(event: Stripe.Event) {
    console.log('Stripe Webhook: subscription deleted');
    const sub = event.data.object as Stripe.Subscription;
    await this.companyModel.findOneAndUpdate(
      { stripeSubscriptionId: sub.id },
      {
        subscriptionStatus: SubscriptionStatus.INACTIVE,
        plan: SubscriptionPlan.FREE,
        aiFeaturesCredits: 0,
        subscriptionExpiresAt: null,
        stripeSubscriptionId: null,
        duration: null
      },
    );
  }

  private async getSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.retrieve(subscriptionId);
  }

  private getExpiringDate(subscription: any, session: Stripe.Checkout.Session) {
    const mainItem = subscription.items.data.find(
      (item) => item.price.id === session.metadata?.priceId,
    );

    if (mainItem && mainItem.current_period_end) {
      return new Date(mainItem.current_period_end * 1000).toISOString();
    }

    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
  }
}
