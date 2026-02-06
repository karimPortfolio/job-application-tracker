import { z } from "zod";

export const createApplicationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Full name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().trim().min(1, "Phone number is required"),
  linkedInUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  resume: z.any().optional(),
  country: z.string().trim().optional().or(z.literal("")),
  city: z.string().trim().optional().or(z.literal("")),
  job: z.string().trim().min(1, "Job is required"),
  status: z.enum(['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected']).optional(),
  stage: z.enum(['screening', 'technical_interview', 'hr_interview', 'final_interview', 'offer']).optional(),
  source: z.string().trim().optional().or(z.literal("")),
  referalName: z.string().trim().optional().or(z.literal("")),
  referalEmail: z.string().email("Invalid referral email").optional().or(z.literal("")),
  appliedAt: z.string().datetime().optional(),
});

export type CreateApplicationSchema = typeof createApplicationSchema;

