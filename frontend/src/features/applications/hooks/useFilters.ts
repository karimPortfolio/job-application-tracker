import { Dispatch, SetStateAction } from "react";
import { ApplicationQuery } from "../types/applications.types";

export function useFilters(
  setQuery: Dispatch<SetStateAction<ApplicationQuery>>,
) {
  const handleFiltersChange = (next: Record<string, unknown>) => {
    //===extract filter values from next
    const fullNameVal =
      typeof next.fullName === "string" ? next.fullName : undefined;
    const countryVal =
      typeof next.country === "string" ? next.country : undefined;
    const cityVal = typeof next.city === "string" ? next.city : undefined;
    const jobVal = typeof next.job === "string" ? next.job : undefined;
    const statusVal = typeof next.status === "string" ? next.status : undefined;
    const stageVal = typeof next.stage === "string" ? next.stage : undefined;
    const sourceVal =
      typeof next.source === "string" ? next.source : undefined;

    //====Extract date range for appliedAt
    const appliedAtStart =
      typeof next.appliedAt === "object" && next.appliedAt !== null
        ? ((next.appliedAt as Record<string, unknown>).start as
            | string
            | undefined)
        : undefined;
    const appliedAtEnd =
      typeof next.appliedAt === "object" && next.appliedAt !== null
        ? ((next.appliedAt as Record<string, unknown>).end as
            | string
            | undefined)
        : undefined;

    setQuery((prev) => ({
      ...prev,
      fullName: fullNameVal,
      country: countryVal,
      city: cityVal,
      job: jobVal,
      status: statusVal,
      stage: stageVal,
      source: sourceVal,
      appliedAtStart,
      appliedAtEnd,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setQuery((prev) => ({
      ...prev,
      fullName: undefined,
      country: undefined,
      city: undefined,
      job: undefined,
      status: undefined,
      stage: undefined,
      source: undefined,
      appliedAtStart: undefined,
      appliedAtEnd: undefined,
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
