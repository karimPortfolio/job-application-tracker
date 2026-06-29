import { api } from "@/lib/api/axios"
import { SAVED_JOBS_ROUTES } from "../routes/saved-jobs.routes"
import { PaginatedResponse, JobQuery } from "@/features/jobs/types/jobs.types";
import { SavedJob } from "../types/saved-jobs.type";

export const getSavedJobs = (query: JobQuery) => {
    return api.get<PaginatedResponse<SavedJob>>(SAVED_JOBS_ROUTES.getSavedJobs, { params: query });
}
