
import { z } from "zod";

export const updateCompanySchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  industry: z.string().trim().min(1, "Industry is required").optional(),
  websiteUrl: z.url().trim().optional().or(z.literal("")),
});

export type UpdateCompanySchema = typeof updateCompanySchema;
