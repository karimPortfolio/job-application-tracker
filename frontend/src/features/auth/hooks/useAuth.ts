"use client";


import {
  loginRequest,
  logoutRequest,
  registerRequest,
  fetchMe,
  googleOAuthRedirectRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  emailVerficationRequest,
} from "../services/auth.service";
import { useApiError } from "@/hooks/useApiError";
import {
  RegisterCredentials,
  LoginCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from "../types";
import { useAuthStore } from "@/stores/auth.store";

export function useAuth() {
  const {
    user,
    setUser,
    initialized,
    setInitialized,
  } = useAuthStore();
  const { error, handleError, clearError } = useApiError();

  const fetchUser = async () => {
    try {
      const data = await fetchMe();
      console.log('Fetched user data:', data);
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setInitialized();
    }
  };

  const login = async (credentials: LoginCredentials) => {
    clearError();

    try {
      await loginRequest(credentials);
      await fetchUser();
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    clearError();

    try {
      await registerRequest(credentials);
      await fetchUser();
    } catch (err: any) {
      handleError(err);
      throw err; // ⬅️ important so component knows it failed
    }
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const requestPasswordReset = async (
    credentials: ForgotPasswordCredentials
  ) => {
    clearError();

    try {
      await forgotPasswordRequest(credentials);
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    clearError();

    try {
      await resetPasswordRequest(credentials);
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  const verifyEmail = async () => {
    clearError();

    try {
      await emailVerficationRequest();
    } catch (err) {
      handleError(err);
      throw err;
    }
  }

  const googleOAuthRedirect = () => {
    clearError();
    try {
      googleOAuthRedirectRequest();
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  return {
    user,
    initialized,
    isAuthenticated: !!user,

    login,
    logout,
    fetchUser,
    register,
    requestPasswordReset,
    resetPassword,
    googleOAuthRedirect,
    verifyEmail,

    apiError: error,
    clearApiError: clearError,
  };
}
