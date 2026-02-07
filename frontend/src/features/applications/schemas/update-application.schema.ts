import { z } from "zod";

export const updateApplicationSchema = z.object({
  fullName: z.string().trim().optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phoneNumber: z.string().trim().optional().or(z.literal("")),
  linkedInUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional().or(z.literal("")),
  resume: z.instanceof(File).optional(),
  country: z.string().trim().optional().or(z.literal("")),
  city: z.string().trim().optional().or(z.literal("")),
  job: z.string().trim().optional().or(z.literal("")),
  status: z.enum(['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected']).optional(),
  stage: z.enum(['screening', 'technical_interview', 'hr_interview', 'final_interview', 'offer']).optional(),
  source: z.string().trim().optional().or(z.literal("")),
  referalName: z.string().trim().optional().or(z.literal("")),
  referalEmail: z.string().email("Invalid referral email").optional().or(z.literal("")),
  appliedAt: z.string().datetime().optional(),
}).strict();

export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
