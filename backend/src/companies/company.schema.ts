import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SubscriptionDuration, SubscriptionPlan, SubscriptionStatus } from '../billing/enums/subscriptions.enums';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, maxLength: 255 })
  name: string;

  @Prop({ required: true, maxLength: 255 })
  industry: string;

  @Prop({
    required: false,
    maxlength: 255,
  })
  websiteUrl?: string;

  @Prop({ required: false, maxLength: 255 })
  adminEmail: string;

  @Prop()
  stripeCustomerId?: string;

  @Prop()
  stripeSubscriptionId?: string;

  @Prop({ default: 0 })
  aiFeaturesCredits?: number;

  @Prop({ default: 'FREE', enum: SubscriptionPlan })
  plan: string;

  @Prop({ enum: SubscriptionDuration })
  duration?: string;

  @Prop({ default: 'inactive', enum: SubscriptionStatus })
  subscriptionStatus: string;

  @Prop()
  subscriptionExpiresAt: Date
}

export const CompanySchema = SchemaFactory.createForClass(Company);
