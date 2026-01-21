import { z } from 'zod'

export const createResetPasswordSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, 'Email is required.')
      .email('Please enter a valid email address.'),
    token: z
      .string()
      .min(1, 'Reset token is required.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.'),
    password_confirmation: z
      .string()
      .min(1, 'Password confirmation is required.'),
  }).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  })
