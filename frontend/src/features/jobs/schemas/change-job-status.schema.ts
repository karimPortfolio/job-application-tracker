
import { z } from "zod";

export const changeJobStatusSchema = z.object({
  status : z.enum(['draft', 'published', 'archived', 'closed'], "Status must be one of: draft, published, archived, closed."),
});

export type ChangeJobStatusSchema = typeof changeJobStatusSchema;

