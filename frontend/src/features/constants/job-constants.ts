import { CreateJobPayload } from "../jobs/types/jobs.types";
import {
  JobEmploymentTypeOption,
  JobExperienceLevelOption,
  JobStatusOption,
} from "../types/jobs.types";

export const JOB_EMPLOYMENT_TYPE_OPTIONS: JobEmploymentTypeOption[] = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

export const JOB_EXPERIENCE_LEVEL_OPTIONS: JobExperienceLevelOption[] = [
  { label: "Junior", value: "junior" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
  { label: "Lead", value: "lead" },
];

export const JOB_STATUS_OPTIONS: JobStatusOption[] = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];
