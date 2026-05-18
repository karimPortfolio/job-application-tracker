import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../companies/company.schema';
import Stripe from 'stripe';
import { Model } from 'mongoose';
import { SubscriptionDuration, SubscriptionPlan, SubscriptionStatus } from './enums/subscriptions.enums';


@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectStripeClient() private readonly stripe: Stripe,
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async createCompanySubscription(
    companyId: string,
    plan: SubscriptionPlan,
    duration: SubscriptionDuration,
  ) {
    const company = (await this.companyModel.findById(
      companyId,
    )) as CompanyDocument;

    const successUrl = `${process.env.FRONTEND_URL}/settings/company/billing?success=true`;

    if (plan === SubscriptionPlan.FREE) {
      await this.companyModel.findByIdAndUpdate(company._id, {
        plan: SubscriptionPlan.FREE,
        duration: duration,
        stripeSubscriptionId: null,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
        subscriptionExpiresAt: null
      });
      return { url: successUrl };
    }

    const priceId = process.env[`STRIPE_${plan}_${duration}_PRICE_ID`];

    if (!priceId) {
      throw new BadRequestException('Invalid subscription plan or duration');
    }

    const customerId = await this.getOrCreateStripeCostumer(company);

    return this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      payment_method_collection: 'always',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: `${process.env.FRONTEND_URL}/pricing?canceled=true`,
      metadata: {
        companyId: company.id,
        subscriptionPlan: plan,
        duration: duration,
        priceId: priceId,
      },
    });
  }

  async cancelCompanySubscription(companyId: string) {
    const company = (await this.companyModel.findById(
      companyId,
    )) as CompanyDocument;

    if (!company.stripeSubscriptionId) {
      throw new BadRequestException('Company does not have an active subscription');
    }

    await this.stripe.subscriptions.cancel(company.stripeSubscriptionId);

    return { message: "Your subscription has been successfully canceled." };
  }

  private async getOrCreateStripeCostumer(company: CompanyDocument): Promise<string> {
    if (company.stripeCustomerId) {
      return company.stripeCustomerId;
    }

    const costumer = await this.stripe.customers.create({
      email: company.adminEmail,
      name: company.name,
      metadata: { companyId: company.id },
    });

    await this.companyModel.findByIdAndUpdate(company.id, {
      stripeCustomerId: costumer.id,
    });

    return costumer.id;
  }
}
