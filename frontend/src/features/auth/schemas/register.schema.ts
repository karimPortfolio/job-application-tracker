// schemas/register.schema.ts
import { z } from "zod";

export const createRegisterSchema = () =>
  z
    .object({
      email: z.string().email('Please enter a valid email address.'),

      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
          'Password must include uppercase, lowercase, number, and special character.'
        ),

      password_confirmation: z.string(),

      first_name: z.string().min(1, 'First name is required.'),
      last_name: z.string().min(1, 'Last name is required.'),

      accepted_terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions.',
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'Passwords do not match.',
      path: ['password_confirmation'],
    });
