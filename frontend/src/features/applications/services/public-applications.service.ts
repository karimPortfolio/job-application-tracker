import { api } from "@/lib/api/axios";
import { CreateApplicationPayload } from "../types/applications.types";
import { PUBLIC_APPLICATIONS_ROUTES } from "../routes/public-applications.routes";


export const  createPublicApplication = async (payload: CreateApplicationPayload, headers: any) => {
    try
    {
        return await api.post(PUBLIC_APPLICATIONS_ROUTES.createPublicApplication, payload, {
            headers:{ ...headers, "Content-Type": "multipart/form-data" }
        });
    } catch (error) {
        throw error;
    }
};
