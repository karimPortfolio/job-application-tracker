import { ApplicationStatus } from "../types/applications.types";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  {
    label: "Applied",
    value: "applied",
    colorClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  },
  {
    label: "In Review",
    value: "in_review",
    colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    label: "Interview",
    value: "interview",
    colorClass:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    label: "Offer",
    value: "offer",
    colorClass:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    label: "Hired",
    value: "hired",
    colorClass:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    label: "Rejected",
    value: "rejected",
    colorClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
];

export const APPLICATION_STAGES = [
  {
    label: "Screening",
    value: "screening",
    colorClass:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
  {
    label: "Technical Interview",
    value: "technical_interview",
    colorClass:
      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  },
  {
    label: "HR Interview",
    value: "hr_interview",
    colorClass:
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
  {
    label: "Final Interview",
    value: "final_interview",
    colorClass:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    label: "Offer",
    value: "offer",
    colorClass:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
];
