
export const SETTINGS_ROUTES = {
    updatePreferences: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/settings/preferences`,
    updateCompany: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/settings/company`,
    cancelBilling: `${process.env.NEXT_PUBLIC_API_VERSION || ''}/settings/company/billing/cancel`
} as const;
