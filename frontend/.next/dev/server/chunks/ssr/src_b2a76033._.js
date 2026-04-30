module.exports = [
"[project]/src/components/PageHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
;
;
function PageHeader({ title, description, actionLabel, actionIcon, action, children, renderActions }) {
    if (children) {
        return children;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4 flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/PageHeader.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground text-sm",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/PageHeader.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PageHeader.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            actionLabel && action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                onClick: action,
                className: "btn btn-primary",
                children: [
                    actionIcon && actionIcon,
                    actionLabel
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PageHeader.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this),
            renderActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: renderActions()
            }, void 0, false, {
                fileName: "[project]/src/components/PageHeader.tsx",
                lineNumber: 40,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PageHeader.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/hooks/useConfirm.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConfirm",
    ()=>useConfirm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$confirm$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/confirm.store.ts [app-ssr] (ecmascript)");
;
function useConfirm() {
    const openConfirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$confirm$2e$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfirmStore"])((state)=>state.openConfirm);
    return (options)=>{
        return new Promise((resolve)=>{
            openConfirm(options, resolve);
        });
    };
}
}),
"[project]/src/features/jobs/routes/jobs.routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JOBS_ROUTES",
    ()=>JOBS_ROUTES
]);
const JOBS_ROUTES = {
    getJobs: `${("TURBOPACK compile-time value", "v1") || ''}/jobs`,
    createJob: `${("TURBOPACK compile-time value", "v1") || ''}/jobs`,
    updateJob: (id)=>`${("TURBOPACK compile-time value", "v1") || ''}/jobs/${id}`,
    getJob: (id)=>`${("TURBOPACK compile-time value", "v1") || ''}/jobs/${id}`,
    deleteJob: (id)=>`${("TURBOPACK compile-time value", "v1") || ''}/jobs/${id}`,
    exportJobs: `${("TURBOPACK compile-time value", "v1") || ''}/jobs/export`,
    generateDescription: `${("TURBOPACK compile-time value", "v1") || ''}/jobs/generate-description`
};
}),
"[project]/src/features/jobs/services/jobs.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createJob",
    ()=>createJob,
    "deleteJob",
    ()=>deleteJob,
    "generateJobDescription",
    ()=>generateJobDescription,
    "getJob",
    ()=>getJob,
    "getJobs",
    ()=>getJobs,
    "updateJob",
    ()=>updateJob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/axios.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/jobs/routes/jobs.routes.ts [app-ssr] (ecmascript)");
;
;
const getJobs = (query)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOBS_ROUTES"].getJobs, {
        params: query
    });
};
const getJob = (id)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOBS_ROUTES"].getJob(id));
};
const createJob = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOBS_ROUTES"].createJob, payload);
};
const updateJob = (id, payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOBS_ROUTES"].updateJob(id), payload);
};
const deleteJob = (id)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOBS_ROUTES"].deleteJob(id));
};
const generateJobDescription = (payload)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$routes$2f$jobs$2e$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JOBS_ROUTES"].generateDescription, payload);
};
}),
"[project]/src/features/jobs/hooks/useJobsActions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useJobActions",
    ()=>useJobActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useConfirm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useConfirm.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useApiError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/jobs/services/jobs.service.ts [app-ssr] (ecmascript)");
;
;
;
;
function useJobActions() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { error, clearError, handleError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useApiError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiError"])();
    const confirm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useConfirm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfirm"])();
    const findJob = async (id)=>{
        setLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJob"])(id);
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const create = async (payload)=>{
        setLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJob"])(payload);
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const update = async (id, payload)=>{
        setLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateJob"])(id, payload);
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const destroy = async (id)=>{
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteJob"])(id);
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    const confirmDelete = async (job)=>{
        const ok = await confirm({
            title: "Delete job",
            description: `Are you sure you want to delete "${job.title}"? This action cannot be undone.`,
            confirmText: "Delete",
            destructive: true
        });
        if (!ok) return;
        await destroy(job.id ?? job._id);
    };
    const generateDescription = async (payload)=>{
        setLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateJobDescription"])(payload);
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        } finally{
            setLoading(false);
        }
    };
    return {
        loading,
        findJob: findJob,
        create,
        update,
        destroy,
        confirmDelete,
        generateDescription,
        apiError: error,
        clearApiError: clearError
    };
}
}),
"[project]/src/features/jobs/hooks/useJobsList.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useJobsList",
    ()=>useJobsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/jobs/services/jobs.service.ts [app-ssr] (ecmascript)");
;
;
function useJobsList(initialQuery) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc',
        ...initialQuery
    });
    const lastFetchKeyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const key = JSON.stringify(query);
        if (lastFetchKeyRef.current === key) return;
        lastFetchKeyRef.current = key;
        const fetchJobs = async ()=>{
            setLoading(true);
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJobs"])(query);
                setData(res.data);
            } finally{
                setLoading(false);
            }
        };
        fetchJobs();
    }, [
        query
    ]);
    return {
        jobs: data?.docs ?? [],
        meta: data,
        loading,
        query,
        setQuery,
        refetch: ()=>{
            lastFetchKeyRef.current = null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$services$2f$jobs$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJobs"])(query).then((res)=>{
                setData(res.data);
                return res;
            });
        }
    };
}
}),
"[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UpdateJobClient",
    ()=>UpdateJobClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PageHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$hooks$2f$useJobsActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/jobs/hooks/useJobsActions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$hooks$2f$useJobsList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/jobs/hooks/useJobsList.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function UpdateJobClient() {
    const { refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$hooks$2f$useJobsList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useJobsList"])();
    const { loading, findJob } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$jobs$2f$hooks$2f$useJobsActions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useJobActions"])();
    const [job, setJob] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = router.query;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadJob() {
            if (typeof id !== "string") return;
            const fetchedJob = await findJob(id);
            setJob(fetchedJob);
        }
        loadJob();
    }, [
        id,
        findJob
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
            title: `Update Job ${job ? `"${job.title}"` : ""}`,
            description: "Fill in the details to update the job opening.",
            renderActions: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    disabled: loading,
                    type: "submit",
                    form: "update-job-form",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonLoadingWrapper, {
                        isLoading: loading,
                        loadingText: "Updating...",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, void 0),
                            "Save"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
const ButtonLoadingWrapper = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function ButtonLoadingWrapper({ isLoading, loadingText, children }) {
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                    className: "mr-2 h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: loadingText
                }, void 0, false, {
                    fileName: "[project]/src/app/(protected)/dashboard/jobs/[id]/edit/UpdateJobClient.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
});
}),
];

//# sourceMappingURL=src_b2a76033._.js.map