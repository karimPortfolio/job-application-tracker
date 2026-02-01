import { CreateJobPayload, JobStatus } from "../types/jobs.types";
import {
  JobEmploymentTypeOption,
  JobExperienceLevelOption,
  JobStatusOption,
} from "../../types/jobs.types";

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

export const JOB_STATUSES: JobStatus[] = [
  {
    label: "Draft",
    value: "draft",
    colorClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  },
  {
    label: "Published",
    value: "published",
    colorClass:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    label: "Closed",
    value: "closed",
    colorClass:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    label: "Archived",
    value: "archived",
    colorClass: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
];
