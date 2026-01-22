

export const AUTH_ROUTES = {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
    me: '/auth/me',
    verifyEmail: '/auth/email/verification-notification',
    googleAuthRedirect:`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/redirect`,
} 
