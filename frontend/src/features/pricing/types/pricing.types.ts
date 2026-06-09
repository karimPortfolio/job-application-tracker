import { SubscriptionDuration, SubscriptionPlan } from "../enums/pricing.enums";

export interface PricingPlan {
  plan: SubscriptionPlan,
  label: string,
  description: string,
  price: number,
  features: string[],
  popular: boolean,
  isCurrentlyActive: boolean,
};

export interface SubscriptionPayload {
  plan: SubscriptionPlan,
  duration: SubscriptionDuration
};
