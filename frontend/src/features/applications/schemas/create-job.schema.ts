
import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: z.string().trim().min(1, "Description is required"),
  country : z.string().trim().min(1, "Country is required"),
  city : z.string().trim().optional().or(z.literal("")),
  status : z.enum(['draft', 'published']).optional(),
  employmentType : z.enum(['full-time', 'part-time', 'contract', 'internship'], "Employment Type is required"),
  experienceLevel : z.enum(['junior', 'mid', 'senior', 'lead'], "Experience Level is required"),
  isRemote : z.boolean().optional(),
  salaryMin : z.number().min(0).optional(),
  salaryMax : z.number().min(0).optional(),
  department : z.string().trim().min(1, "Department ID is required"),
});

export type CreateJobSchema = typeof createJobSchema;

