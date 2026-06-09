import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from '../companies/company.schema';
import Stripe from 'stripe';
import { Model } from 'mongoose';
import {
  SubscriptionDuration,
  SubscriptionPlan,
  SubscriptionStatus,
} from './enums/subscriptions.enums';

const TTL = {
  INVOICES: 60, // 60s
  PAYMENT_METHODS: 600, // 10m
  PRICE: 3600, // 1h
};

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectStripeClient() private readonly stripe: Stripe,
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    @Inject('CACHE_MANAGER') private cache: any,
  ) {}

  async createCompanySubscription(
    companyId: string,
    plan: SubscriptionPlan,
    duration: SubscriptionDuration,
  ) {
    const company = (await this.companyModel.findById(
      companyId,
    )) as CompanyDocument;

    const successUrl = `${process.env.FRONTEND_URL}/dashboard/settings/company/billing?success=true`;

    if (plan === SubscriptionPlan.FREE) {
      await this.companyModel.findByIdAndUpdate(company._id, {
        plan: SubscriptionPlan.FREE,
        duration: duration,
        stripeSubscriptionId: null,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
        subscriptionExpiresAt: null,
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
      throw new BadRequestException(
        'Company does not have an active subscription',
      );
    }

    await this.stripe.subscriptions.cancel(company.stripeSubscriptionId);

    return { message: 'Your subscription has been successfully canceled.' };
  }

  async getCompanyBillingDetails(companyId: string) {
    const company = (await this.companyModel.findById(
      companyId,
    )) as CompanyDocument;

    const subscriptionDetails = (await this.companyModel
      .findById(company._id)
      .select(
        'subscriptionStatus plan duration subscriptionExpiresAt aiFeaturesCredits',
      )
      .lean()) as CompanyDocument;

    const [lastFiveInvoices, companyPaymentMethods] = await Promise.all([
      this.getLastFiveInvoices(companyId),
      this.getLastThreePaymentMethods(companyId),
    ]);

    const subscription = {
      plan: {
        label: this.getSubscriptionPlanLabel(
          subscriptionDetails.plan as SubscriptionPlan,
        ),
        price: await this.getSubscriptionPrice(
          companyId,
          subscriptionDetails.plan as SubscriptionPlan,
          subscriptionDetails.duration as SubscriptionDuration,
        ),
      },
      status: subscriptionDetails.subscriptionStatus,
      expiresAt: subscriptionDetails.subscriptionExpiresAt,
      aiFeaturesCredits: subscriptionDetails.aiFeaturesCredits,
      duration:
        subscriptionDetails.duration === SubscriptionDuration.MONTHLY
          ? 'Monthly'
          : 'Yearly',
    };

    return {
      subscription: subscription,
      invoices: lastFiveInvoices,
      paymentMethods: companyPaymentMethods,
    };
  }

  async getLastFiveInvoices(companyId: string) {
    const company = await this.companyModel.findById(companyId).lean();
    if (!company?.stripeCustomerId)
      throw new BadRequestException('Company does not have customer details.');

    const key = this.getCachingKey(companyId, 'invoices');
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const fetched = await this.stripe.invoices.list({
      customer: company.stripeCustomerId,
      limit: 5,
    });
    const invoices = fetched.data.map((i) => ({
      id: i.id,
      amount: i.amount_due / 100,
      currency: i.currency,
      status: i.status,
      date: new Date(i.created * 1000),
      pdfUrl: i.invoice_pdf,
    }));
    await this.cache.set(key, invoices, { ttl: TTL.INVOICES });
    return invoices;
  }

  async getLastThreePaymentMethods(companyId: string) {
    const key = this.getCachingKey(companyId, 'payment_methods');
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const company = await this.companyModel.findById(companyId).lean();
    if (!company?.stripeCustomerId)
      throw new BadRequestException('Company does not have customer details.');

    const fetched = await this.stripe.paymentMethods.list({
      customer: company.stripeCustomerId,
      type: 'card',
      limit: 3,
    });
    const methods = fetched.data.map((pm) => ({
      brand: pm.card?.brand || pm.card?.display_brand,
      country: pm.billing_details?.address?.country,
      expMonth: pm.card?.exp_month,
      expYear: pm.card?.exp_year,
      lastDigits: pm.card?.last4,
    }));
    await this.cache.set(key, methods, { ttl: TTL.PAYMENT_METHODS });
    return methods;
  }

  private async getOrCreateStripeCostumer(
    company: CompanyDocument,
  ): Promise<string> {
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

  private getSubscriptionPlanLabel(plan: SubscriptionPlan): string {
    switch (plan) {
      case SubscriptionPlan.FREE:
        return 'Free';
      case SubscriptionPlan.PRO:
        return 'Pro';
      case SubscriptionPlan.ENTERPRISE:
        return 'Enterprise';
      default:
        return 'Unknown';
    }
  }

  private async getSubscriptionPrice(
    companyId: string,
    plan: SubscriptionPlan,
    duration: SubscriptionDuration,
  ) {
    if (plan === SubscriptionPlan.FREE) {
      return 0;
    }

    const priceId = process.env[`STRIPE_${plan}_${duration}_PRICE_ID`];
    if (!priceId)
      throw new BadRequestException('Invalid subscription plan or duration');

    const key = `price:${priceId}`;
    const cached = (await this.cache.get(key)) as any;
    if (cached) return cached.price;

    const price = await this.stripe.prices.retrieve(priceId);
    const amount = price.unit_amount ? price.unit_amount / 100 : 0;
    await this.cache.set(key, { price: amount }, { ttl: TTL.PRICE });
    return amount;
  }

  private getCachingKey(
    companyId: string,
    type: 'payment_methods' | 'invoices' | 'price',
    extra?: string,
  ): string {
    switch (type) {
      case 'payment_methods':
        return `${companyId}:lastPaymentMethods`;
      case 'invoices':
        return `${companyId}:invoices`;
      case 'price':
        return `${companyId}:price:${extra ?? ''}`;
    }
  }
}
