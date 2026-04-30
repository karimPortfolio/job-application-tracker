import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters")
    .optional(),
    
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),

  avatar: z
  .file()
  .mime(["image/jpeg", "image/png"])
  .optional()
});

export type UpdateProfileSchema = typeof updateProfileSchema;
