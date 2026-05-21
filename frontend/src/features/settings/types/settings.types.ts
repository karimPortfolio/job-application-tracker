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
