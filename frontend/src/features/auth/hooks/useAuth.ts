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
import { useState } from "react";
import { set } from "zod";

export function useAuth() {
  const { user, setUser, initialized, setInitialized } = useAuthStore();
  const { error, handleError, clearError } = useApiError();

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const data = await fetchMe();
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setInitialized();
    }
  };

  const login = async (credentials: LoginCredentials) => {
    clearError();
    setLoading(true);

    try {
      await loginRequest(credentials);
      await fetchUser();
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    clearError();
    setLoading(true);

    try {
      await registerRequest(credentials);
      await fetchUser();
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    clearError();
    setLoading(true);
    try {
      await logoutRequest();
      setUser(null);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (
    credentials: ForgotPasswordCredentials,
  ) => {
    clearError();
    setLoading(true);

    try {
      await forgotPasswordRequest(credentials);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    clearError();
    setLoading(true);

    try {
      await resetPasswordRequest(credentials);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    clearError();
    setLoading(true);

    try {
      await emailVerficationRequest();
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleOAuthRedirect = () => {
    clearError();
    setLoading(true);

    try {
      googleOAuthRedirectRequest();
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    initialized,
    isAuthenticated: !!user,
    loading,

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
