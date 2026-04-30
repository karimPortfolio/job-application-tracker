(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: `${("TURBOPACK compile-time value", "http://localhost:4000")}/api`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});
api.interceptors.response.use((response)=>{
    const method = response.config?.method?.toLowerCase();
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && method && method !== 'get' && method !== 'options') {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Request completed successfully');
    }
    return response;
}, (error)=>{
    const data = error?.response?.data;
    const message = data && (data.message || data.error || data.detail || data.title) || error?.message || 'Something went wrong';
    if ("TURBOPACK compile-time truthy", 1) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message);
    }
    return Promise.reject(error);
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/routes/auth.routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_ROUTES",
    ()=>AUTH_ROUTES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const AUTH_ROUTES = {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    logout: '/auth/logout',
    me: '/auth/me',
    resendVerification: '/auth/resend-verification',
    verifyEmail: '/auth/verify-email',
    googleAuthRedirect: `${("TURBOPACK compile-time value", "http://localhost:4000")}/auth/google/redirect`
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/services/auth.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emailVerificationRequest",
    ()=>emailVerificationRequest,
    "fetchMe",
    ()=>fetchMe,
    "forgotPasswordRequest",
    ()=>forgotPasswordRequest,
    "googleOAuthRedirectRequest",
    ()=>googleOAuthRedirectRequest,
    "loginRequest",
    ()=>loginRequest,
    "logoutRequest",
    ()=>logoutRequest,
    "registerRequest",
    ()=>registerRequest,
    "resetPasswordRequest",
    ()=>resetPasswordRequest,
    "verifyEmailRequest",
    ()=>verifyEmailRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/routes/auth.routes.ts [app-client] (ecmascript)");
;
;
const loginRequest = async (credentials)=>{
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].login, credentials);
};
const logoutRequest = async ()=>{
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].logout);
};
const fetchMe = async ()=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].me);
    return data;
};
const registerRequest = async (credentials)=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].register, credentials);
    return data;
};
const forgotPasswordRequest = async (credentials)=>{
    const { email } = credentials;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].forgotPassword, {
        email
    });
};
const resetPasswordRequest = async (credentials)=>{
    const { email, token, password, password_confirmation } = credentials;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].resetPassword, {
        email,
        token,
        password,
        password_confirmation
    });
};
const emailVerificationRequest = async ()=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].resendVerification);
};
const verifyEmailRequest = async (token, email)=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].verifyEmail, {
        token,
        email
    });
};
const googleOAuthRedirectRequest = ()=>{
    window.location.href = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$routes$2f$auth$2e$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ROUTES"].googleAuthRedirect;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useApiError.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useApiError",
    ()=>useApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useApiError() {
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const clearError = ()=>setError(null);
    const handleError = (err)=>{
        const status = err?.response?.status;
        const data = err?.response?.data;
        switch(status){
            case 401:
                setError({
                    title: 'Unauthenticated',
                    status,
                    message: 'You need to log in to access this resource.'
                });
                break;
            case 403:
                setError({
                    title: 'Forbidden',
                    status,
                    message: 'You do not have permission to access this resource.'
                });
                break;
            case 404:
                setError({
                    title: 'Not Found',
                    status,
                    message: 'The requested resource could not be found.'
                });
                break;
            case 422:
                setError({
                    title: 'Validation Error',
                    status,
                    message: 'There was a problem with your submission.',
                    validationErrors: data?.errors ?? {}
                });
                break;
            case 429:
                setError({
                    title: 'Too Many Requests',
                    status,
                    message: 'You have made too many requests. Please try again later.'
                });
                break;
            case 500:
                setError({
                    title: 'Server Error',
                    status,
                    message: 'An internal server error occurred. Please try again later.'
                });
                break;
            default:
                setError({
                    title: 'Unexpected Error',
                    status: status ?? null,
                    message: 'An unexpected error occurred. Please try again.'
                });
        }
    };
    return {
        error,
        handleError,
        clearError
    };
}
_s(useApiError, "A8i/78Fx3FIozbyR2zwnz0NK35o=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/auth.store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        user: null,
        initialized: false,
        setUser: (user)=>set({
                user
            }),
        setInitialized: ()=>set({
                initialized: true
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useApiError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/auth.store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useAuth() {
    _s();
    const { user, setUser, initialized, setInitialized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { error, handleError, clearError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiError"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchUser = async ()=>{
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchMe"])();
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally{
            setInitialized();
        }
    };
    const login = async (credentials)=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginRequest"])(credentials);
            await fetchUser();
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const register = async (credentials)=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerRequest"])(credentials);
            await fetchUser();
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const logout = async ()=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutRequest"])();
            setUser(null);
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const requestPasswordReset = async (credentials)=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forgotPasswordRequest"])(credentials);
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const resetPassword = async (credentials)=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordRequest"])(credentials);
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const resentVerification = async ()=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emailVerificationRequest"])();
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const verifyEmail = async (token, email)=>{
        clearError();
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyEmailRequest"])(token, email);
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const googleOAuthRedirect = ()=>{
        clearError();
        setLoading(true);
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["googleOAuthRedirectRequest"])();
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
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
        resentVerification,
        apiError: error,
        clearApiError: clearError
    };
}
_s(useAuth, "7iQgKFcS5mFz9Y02OvUtVDFFeZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useApiError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiError"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Spinner",
    ()=>Spinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function Spinner({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
        role: "status",
        "aria-label": "Loading",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("size-4 animate-spin", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/spinner.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Spinner;
;
var _c;
__turbopack_context__.k.register(_c, "Spinner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AuthProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthProvider({ children }) {
    _s();
    const { fetchUser, initialized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            fetchUser();
        }
    }["AuthProvider.useEffect"], []);
    if (!initialized) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center h-44",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
            className: "size-8"
        }, void 0, false, {
            fileName: "[project]/src/components/AuthProvider.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AuthProvider.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthProvider, "t1TsvXBEtmxvmZ25pCgVpxUlYro=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        storageKey: "theme",
        disableTransitionOnChange: true,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ThemeProvider.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e70d91f6._.js.map