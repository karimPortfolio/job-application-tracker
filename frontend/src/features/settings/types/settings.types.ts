import {
  SubscriptionDuration,
  SubscriptionStatus,
} from "@/features/pricing/enums/pricing.enums";

export interface PreferencePayload {
  theme?: "dark" | "light" | "system";
  notifications?: {
    email?: boolean;
    push?: boolean;
    marketing?: boolean;
  };
}

export interface CompanyPayload {
  name?: string;
  industry?: string;
  websiteUrl?: string;
}
export interface PaymentMethod {
  brand: string;
  country: string;
  expMonth: number;
  expYear: number;
  lastDigits: string;
  img?:string;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  statusClassName?:string;
  statusLabel?:string;
  date: string;
  pdfUrl?: string;
}

export interface BillingDetails {
  subscription: {
    _id: string;
    status: SubscriptionStatus;
    aiFeaturesCredits: number;
    duration?: SubscriptionDuration;
    plan: {
      label: string,
      price: number
    };
    expiresAt?: string;
  };
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
}
