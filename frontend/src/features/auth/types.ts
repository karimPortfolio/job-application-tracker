export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
  company: {
    id: number;
    name: string;
    slug?: string | null;
  };
  membershipType: {
    value: "owner" | "member" | "admin";
    label: string;
    color: string;
    hex_color: string;
  };
  permissions?: string[] | null; 
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt?: string| null;
}

export interface AuthResponse {
  user: User;
}

export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation?: string;
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


export type ValidationErrors = Record<string, string[]>
