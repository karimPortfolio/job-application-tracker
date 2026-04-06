import { z } from "zod";

export const createPublicApplicationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Full name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().trim().min(1, "Phone number is required").regex(/^\+?[\d\s\-()]{7,}$/, "Invalid phone number format"),
  linkedInUrl: z.string().regex(/^https?:\/\/(www\.)?linkedin\.com\//, "Invalid LinkedIn URL").optional().or(z.literal("")),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Resume must be at most 5MB")
    .refine(
      (file) => ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
      "Resume must be either PDF or DOCX format"
    ),
  country: z.string().trim().min(1, "Country is required"),
  city: z.string().trim().optional().or(z.literal("")),
});

export type CreatePublicApplicationSchema = typeof createPublicApplicationSchema;

