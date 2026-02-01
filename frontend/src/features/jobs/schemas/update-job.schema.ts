import { z } from "zod";

export const updateJobSchema = z.object({
  title: z.string().trim().max(100, "Title must be at most 100 characters").optional(),
  description: z.string().trim().optional(),
  country: z.string().trim().optional(),
  city: z.string().trim().optional().or(z.literal("")),
  status: z
    .enum(["draft", "published", "closed", "archived"], {
      message: "Invalid status",
    })
    .optional(),
  employmentType: z
    .enum(["full-time", "part-time", "contract", "internship"], {
      message: "Employment Type is required",
    })
    .optional(),
  experienceLevel: z
    .enum(["junior", "mid", "senior", "lead"], {
      message: "Experience Level is required",
    })
    .optional(),
  isRemote: z.boolean().optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  department: z.string().trim().optional(),
});

export type UpdateJobSchema = typeof updateJobSchema;
