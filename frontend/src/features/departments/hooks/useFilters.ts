import { Dispatch, SetStateAction } from "react";
import { DepartmentQuery } from "../types/departments.types";

export function useFilters(
  setQuery: Dispatch<SetStateAction<DepartmentQuery>>,
) {
  const handleFiltersChange = (next: Record<string, unknown>) => {
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
      createdStart: createdAtStart,
      createdEnd: createdAtEnd,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setQuery((prev) => ({
      ...prev,
      createdStart: undefined,
      createdEnd: undefined,
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
