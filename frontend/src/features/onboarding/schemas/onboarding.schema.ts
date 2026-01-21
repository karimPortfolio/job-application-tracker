import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  industry: z.string().trim().min(1, "Industry is required"),
  websiteUrl: z.string().trim().optional().or(z.literal("")),
});

export type OnboardingSchema = typeof onboardingSchema;
