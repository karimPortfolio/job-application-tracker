import { verify } from "crypto";


export const AUTH_ROUTES = {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
    me: '/auth/me',
    resendVerification: '/auth/resend-verification',
    verifyEmail: '/auth/verify-email',
    googleAuthRedirect:`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/redirect`,
} 
