import { z } from 'zod'

export const createForgotPasswordSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, 'Email is required.')
      .email('Please enter a valid email address.'),
  })
