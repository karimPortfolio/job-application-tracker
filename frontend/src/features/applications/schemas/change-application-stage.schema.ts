
import { z } from "zod";

export const changeApplicationStageSchema = z.object({
  stage : z.enum(['screening', 'technical_interview', 'hr_interview', 'final_interview', 'offer'], "Stage must be one of: screening, technical_interview, hr_interview, final_interview, offer."),
});

export type ChangeApplicationStageSchema = typeof changeApplicationStageSchema;