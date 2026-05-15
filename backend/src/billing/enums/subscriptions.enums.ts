
export enum SubscriptionPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
}

export enum SubscriptionDuration {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum SubscriptionCredits {
  PRO_MONTHLY = 100,
  ENTERPRISE_MONTHLY = 1000,
  PRO_YEARLY= PRO_MONTHLY * 12,
  ENTERPRISE_YEARLY= ENTERPRISE_MONTHLY * 12,
}
