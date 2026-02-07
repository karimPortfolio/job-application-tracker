
import { z } from "zod";

export const changeApplicationStatusSchema = z.object({
  status : z.enum(['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected'], "Status must be one of: applied, in_review, interview, offer, hired, rejected."),
});

export type ChangeApplicationStatusSchema = typeof changeApplicationStatusSchema;
