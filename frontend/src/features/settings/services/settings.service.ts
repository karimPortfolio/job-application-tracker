import { api } from "@/lib/api/axios";
import { BillingDetails, CompanyPayload, PreferencePayload } from "../types/settings.types";
import { SETTINGS_ROUTES } from "../routes/settings.routes";

export function updatePreferences(payload: PreferencePayload)
{
    return api.patch(SETTINGS_ROUTES.updatePreferences, payload);
}

export function updateCompany(payload: CompanyPayload)
{
    return api.patch(SETTINGS_ROUTES.updateCompany, payload);
}

export function getBillingDetails() {
    return api.get<BillingDetails>(SETTINGS_ROUTES.getBillingDetails);
}

export function cancelBilling()
{
    return api.post(SETTINGS_ROUTES.cancelBilling);
}
