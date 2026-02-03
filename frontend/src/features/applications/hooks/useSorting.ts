import { Dispatch, SetStateAction } from "react";
import { ApplicationQuery } from "../types/applications.types";

export function useSorting(
  setQuery: Dispatch<SetStateAction<ApplicationQuery>>,
) {

  const handleSortChange = (
    sort: { key: string; direction: "asc" | "desc" } | null,
  ) => {
    if (!sort) sort = { key: "createdAt", direction: "desc" };

    const allowed: ApplicationQuery["sortBy"][] = [
      "fullName",
      "createdAt",
      "phoneNumber",
    ];

    const sortKey = (
      allowed.includes(sort.key as any) ? sort.key : "createdAt"
    ) as ApplicationQuery["sortBy"];
    const order: ApplicationQuery["order"] = sort.direction ?? "desc";

    console.log("Sorting by:", sortKey);
    setQuery((prev) => ({ ...prev, sortBy: sortKey, order, page: 1 }));
  };

    return { handleSortChange };
}
