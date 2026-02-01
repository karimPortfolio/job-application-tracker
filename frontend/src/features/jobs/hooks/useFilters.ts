import { Dispatch, SetStateAction } from "react";
import { JobQuery } from "../types/jobs.types";

export function useFilters(
  setQuery: Dispatch<SetStateAction<JobQuery>>,
) {

  const handleFiltersChange = (next: Record<string, unknown>) => {
    const departmentVal =
      typeof next.department === "string" ? next.department : undefined;
    const statusVal = typeof next.status === "string" ? next.status : undefined;
    const employmentTypeVal =
      typeof next.employmentType === "string" &&
      ["full-time", "part-time", "contract", "internship"].includes(
        next.employmentType,
      )
        ? (next.employmentType as JobQuery["employmentType"])
        : undefined;
    const experienceLevelVal =
      typeof next.experienceLevel === "string" &&
      ["junior", "mid", "senior", "lead"].includes(next.experienceLevel)
        ? (next.experienceLevel as JobQuery["experienceLevel"])
        : undefined;
    const isRemoteVal =
      typeof next.isRemote === "string"
        ? next.isRemote === "true"
        : typeof next.isRemote === "boolean"
          ? next.isRemote
          : undefined;

    const createdAtStart =
      typeof next.createdAt === "object" && next.createdAt !== null
        ? ((next.createdAt as Record<string, unknown>).start as
            | string
            | undefined)
        : undefined;
    const createdAtEnd =
      typeof next.createdAt === "object" && next.createdAt !== null
        ? ((next.createdAt as Record<string, unknown>).end as
            | string
            | undefined)
        : undefined;

    setQuery((prev) => ({
      ...prev,
      status: statusVal,
      employmentType: employmentTypeVal,
      experienceLevel: experienceLevelVal,
      isRemote: isRemoteVal,
      department: departmentVal,
      createdAtStart: createdAtStart,
      createdAtEnd: createdAtEnd,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setQuery((prev) => ({
      ...prev,
      status: undefined,
      employmentType: undefined,
      experienceLevel: undefined,
      isRemote: undefined,
      page: 1,
    }));
  };

  const handleSearch = (term: string) => {
    setQuery((prev) => ({ ...prev, search: term, page: 1 }));
  };

  return {
    handleFiltersChange,
    handleResetFilters,
    handleSearch,
  };
}
