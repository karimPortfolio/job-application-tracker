import { z } from 'zod'

export const createLoginSchema = () =>
  z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string(),
    remember_me: z.boolean(),
  })