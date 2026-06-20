export interface Company {
  id: number;
  name: string;
  industry: string;
  websiteUrl?: string;
  aiFeaturesCredits?: number;
  plan?: string;
  duration?: string;
  subscriptionStatus?: string;
  subscriptionExpiresAt?: Date;
}
export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
  company: Company;
  membershipType: {
    value: "owner" | "member" | "admin";
    label: string;
    color: string;
    hex_color: string;
  };
  preferences?: {
    theme?: "dark" | "light" | "system";
    notifications?: {
      email?: boolean;
      push?: boolean;
      marketing?: boolean;
    };
  };
  role?: string;
  permissions?: string[] | null;
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export enum UserRole {
  RECRUITER='recruiter',
  USER='user',
  ADMIN='admin'
};

export interface AuthResponse {
  user: User;
}

export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  role?: string;
  accepted_terms: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export type ValidationErrors = Record<string, string[]>;
