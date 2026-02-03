import type { ApplicationStage, ApplicationStatus } from "../types/applications.types";



export const APPLICATION_STATUSES: ApplicationStatus[] = [
  {
    label: "Applied",
    value: "applied",
  },
  {
    label: "In Review",
    value: "in_review",
  },
  {
    label: "Interview",
    value: "interview",
  },
  {
    label: "Offer",
    value: "offer",
  },
  {
    label: "Hired",
    value: "hired",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export const APPLICATION_STAGES: ApplicationStage[] = [
  {
    label: "Screening",
    value: "screening",
  },
  {
    label: "Technical Interview",
    value: "technical_interview",
  },
  {
    label: "HR Interview",
    value: "hr_interview",
  },
  {
    label: "Final Interview",
    value: "final_interview",
  },
  {
    label: "Offer",
    value: "offer",
  },
];

