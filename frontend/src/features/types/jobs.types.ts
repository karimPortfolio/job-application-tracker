import { CreateJobPayload } from "../jobs/types/jobs.types";

export interface JobEmploymentTypeOption {
  label: string;
  value: CreateJobPayload["employmentType"];
}

export interface JobExperienceLevelOption {
  label: string;
  value: CreateJobPayload["experienceLevel"];
}

export interface JobStatusOption {
  label: string;
  value: "draft" | "published";
}