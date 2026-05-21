import { api } from "@/lib/api/axios";
import { CompanyPayload, PreferencePayload } from "../types/settings.types";
import { SETTINGS_ROUTES } from "../routes/settings.routes";

export function updatePreferences(payload: PreferencePayload)
{
    return api.patch(SETTINGS_ROUTES.updatePreferences, payload);
}

export function updateCompany(payload: CompanyPayload)
{
    return api.patch(SETTINGS_ROUTES.updateCompany, payload);
}

export function cancelBilling()
{
    return api.post(SETTINGS_ROUTES.cancelBilling);
}
