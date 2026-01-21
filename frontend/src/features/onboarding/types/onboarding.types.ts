export type OnboardingPayload = {
  name: string;
  industry: string;
  websiteUrl?: string;
};

export type OnboardingResponse = {
  id: string;
  name: string;
  industry: string;
  websiteUrl?: string;
};

export type IndustryOption = {
  label: string;
  value: string;
};

export type IndustryOptions = IndustryOption[];