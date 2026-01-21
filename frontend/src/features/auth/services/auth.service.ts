import { AuthResponse, RegisterCredentials, LoginCredentials, ForgotPasswordCredentials, ResetPasswordCredentials } from '../types';
import { api } from '@/lib/api/axios';
import { AUTH_ROUTES } from '../routes/auth.routes';


export const loginRequest = async (credentials: LoginCredentials) => {
  return await api.post(AUTH_ROUTES.login, credentials)
}

export const logoutRequest = async () => {
  return await api.post(AUTH_ROUTES.logout)
}

export const fetchMe = async () => {
  const { data } = await api.get(AUTH_ROUTES.me)
  return data
}


export const registerRequest = async (credentials: RegisterCredentials) => {
  
  const { data } = await api.post<AuthResponse>(AUTH_ROUTES.register, credentials)

  return data
}

export const forgotPasswordRequest = async (credentials: ForgotPasswordCredentials) => {
  const { email } = credentials;

  await api.post(AUTH_ROUTES.forgotPassword, {
    email,
  });
}

export const resetPasswordRequest = async (credentials: ResetPasswordCredentials) => {
  const { email, token, password, password_confirmation } = credentials;

  await api.post(AUTH_ROUTES.resetPassword, {
    email,
    token,
    password,
    password_confirmation,
  });
}

export const emailVerficationRequest = async () => {
  await api.post(AUTH_ROUTES.verifyEmail);
}

export const googleOAuthRedirectRequest = () => {
  window.location.href = AUTH_ROUTES.googleAuthRedirect;
}
