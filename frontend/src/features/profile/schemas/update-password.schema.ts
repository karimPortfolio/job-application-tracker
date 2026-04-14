import { z } from "zod";

export const updatePasswordSchema = z.object({
  currentPassword: z.string().optional(),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      "Password must include uppercase, lowercase, number, and special character.",
    )
    .optional(),

  newPasswordConfirm: z.string(),
});

export type UpdatePasswordSchema = typeof updatePasswordSchema;
