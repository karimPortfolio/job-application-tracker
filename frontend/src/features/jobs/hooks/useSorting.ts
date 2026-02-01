import { Dispatch, SetStateAction } from "react";
import { JobQuery } from "../types/jobs.types";

export function useSorting(
  setQuery: Dispatch<SetStateAction<JobQuery>>,
) {

  const handleSortChange = (
    sort: { key: string; direction: "asc" | "desc" } | null,
  ) => {
    if (!sort) sort = { key: "createdAt", direction: "desc" };

    const allowed: JobQuery["sortBy"][] = [
      "title",
      "createdAt",
      "applicationsCount",
      "viewsCount",
    ];

    const sortKey = (
      allowed.includes(sort.key as any) ? sort.key : "createdAt"
    ) as JobQuery["sortBy"];
    const order: JobQuery["order"] = sort.direction ?? "desc";

    console.log("Sorting by:", sortKey);
    setQuery((prev) => ({ ...prev, sortBy: sortKey, order, page: 1 }));
  };

    return { handleSortChange };
}
