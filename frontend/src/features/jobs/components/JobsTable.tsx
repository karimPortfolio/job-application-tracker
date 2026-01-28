"use client";

import { DataTable, type DataTableColumn } from "@/components/common/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { useTextTruncate } from "@/hooks/useTextTruncate";
import { FiltersBar } from "@/components/filters/FiltersBar";
import type { FilterGroup } from "@/hooks/useFiltersBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMemo } from "react";
import { Job, JobQuery, JobStatus } from "../types/jobs.types";
import { useJobsList } from "../hooks/useJobsList";
import { useJobActions } from "../hooks/useJobsActions";
import { JOBS_ROUTES } from "../routes/jobs.routes";
import { cn } from "@/lib/utils";

interface JobsTableProps {
  onEdit?: (job: Job) => void;
}

export function JobsTable({ onEdit }: JobsTableProps) {
  const { jobs, loading, meta, query, setQuery, refetch } = useJobsList();
  const { confirmDelete, loading: isDeleting } = useJobActions();
  const { user } = useAuth();

  const jobStatuses: JobStatus[] = [
    {
      label: "Draft",
      value: "draft",
      colorClass:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
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
      colorClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  ];

  const handlePageChange = (page: number) => {
    const totalPages = meta?.totalPages ?? 1;
    const safe = Math.min(Math.max(page, 1), totalPages);
    setQuery((prev) => ({ ...prev, page: safe }));
  };

  const handleLimitChange = (value: number) => {
    setQuery((prev) => ({ ...prev, limit: value, page: 1 }));
  };

  const handleSearch = (term: string) => {
    setQuery((prev) => ({ ...prev, search: term, page: 1 }));
  };

  const handleSortChange = (
    sort: { key: string; direction: "asc" | "desc" } | null,
  ) => {
    if (!sort) return;

    const allowed: JobQuery["sortBy"][] = [
      "title",
      "createdAt",
      "applicationsCount",
      "viewsCount",
    ];

    const sortKey = (allowed.includes(sort.key as any)
      ? sort.key
      : "createdAt") as JobQuery["sortBy"];
    const order: JobQuery["order"] = sort.direction ?? "desc";

    setQuery((prev) => ({ ...prev, sortBy: sortKey, order, page: 1 }));
  };

  const filters: FilterGroup[] = useMemo(() => [
    {
      key: "status",
      type: "enum",
      label: "Status",
      options: jobStatuses,
    },
    {
      key: "employmentType",
      type: "enum",
      label: "Employment Type",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
      ],
    },
    {
      key: "isRemote",
      type: "boolean",
      label: "Remote",
      options: [
        { label: "Remote", value: "true" },
        { label: "Not Remote", value: "false" },
      ],
    },
    {
      key: "experienceLevel",
      type: "enum",
      label: "Experience Level",
      options: [
        { label: "Junior", value: "junior" },
        { label: "Mid", value: "mid" },
        { label: "Senior", value: "senior" },
        { label: "Lead", value: "lead" },
      ],
    }
  ], []);

  const handleFiltersChange = (next: Record<string, unknown>) => {
    const statusVal = typeof next.status === "string" ? next.status : undefined;
    const employmentTypeVal =
      typeof next.employmentType === "string" &&
      ["full-time", "part-time", "contract", "internship"].includes(next.employmentType)
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

    setQuery((prev) => ({
      ...prev,
      status: statusVal,
      employmentType: employmentTypeVal,
      experienceLevel: experienceLevelVal,
      isRemote: isRemoteVal,
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

  const fileName = useMemo(() => {
    if (user?.company && user?.company.name) {
      const sanitizedCompanyName = user.company.name
        .toLowerCase()
        .replace(/\s+/g, "_");
      return `${sanitizedCompanyName}jobs_export`;
    }

    return `jobs_export`;
  }, [user?.company.name]);

  const jobStatusMap = useMemo(() => {
    const map: Record<string, { label: string; colorClass: string }> = {};
    for (const s of jobStatuses) map[s.value] = s;
    return map;
  }, [jobStatuses]);

  const columns: DataTableColumn<Job>[] = useMemo(
    () => [
      {
        key: "title",
        label: "Title",
        sortable: true,
        render: (row) => (
          <span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {row.title}
            </span>
            <span className="flex text-gray-600 dark:text-gray-400" >{row.department?.title || ""}</span>
          </span>
        ),
      },
      {
        key: "country",
        label: "Location",
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {row.country}
            {row.city ? `, ${row.city}` : ""}
          </span>
        ),
      },
      {
        key: "employmentType",
        label: "Employment",
        render: (row) => (
          <span className="text-sm text-gray-900 dark:text-gray-100">
            <span className="font-medium">{row.employmentType}</span>
            <span className="flex text-gray-600 dark:text-gray-400">
              {row.experienceLevel}
            </span>
          </span>
        ),
      },
      {
        key: "salaryRange",
        label: "Salary Range",
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {row.salaryMin && row.salaryMax
              ? `$${row.salaryMin.toLocaleString()} - $${row.salaryMax.toLocaleString()}`
              : "Not specified"}
          </span>
        ),
      },
      {
        key: "isRemote",
        label: "Remote",
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            <Badge
              className={cn(
                row.isRemote
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
              )}
            >
              {row.isRemote ? "Remote" : "Not Remote"}
            </Badge>
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            <Badge
              className={cn(jobStatusMap[row.status ?? "draft"]?.colorClass)}
            >
              {jobStatusMap[row.status ?? "draft"]?.label || row.status}
            </Badge>
          </span>
        ),
      },
      {
        key: "createdAtDiff",
        label: "Creation details",
        sortable: true,
        render: (row) => (
          <span
            className="text-sm text-gray-600 dark:text-gray-400"
            title={row.description || ""}
          >
            {row.createdAtDiff || row.createdAt}
          </span>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        align: "left",
        render: (row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit?.(row)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Show
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit?.(row)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                disabled={isDeleting}
                onClick={() => confirmDelete(row)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEdit, isDeleting, confirmDelete, jobStatuses],
  );

  return (
    <div className="space-y-4">
      <FiltersBar
        search={query.search ?? ""}
        onSearch={handleSearch}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
        onRefresh={async () => {
          await refetch();
        }}
        endpoint={JOBS_ROUTES.exportJobs}
        filename={fileName}
      />
      <DataTable
        data={jobs}
        columns={columns}
        loading={loading}
        striped
        emptyMessage="No jobs found."
        remoteSort
        defaultSort={{
          key: query.sortBy ?? "createdAt",
          direction: (query.order as "asc" | "desc") ?? "desc",
        }}
        onSortChange={handleSortChange}
        pagination={{
          page: meta?.page ?? 1,
          totalPages: meta?.totalPages ?? 1,
          totalItems: meta?.totalDocs ?? jobs.length,
          pageSize: query.limit ?? 10,
          pageSizeOptions: [5, 10, 20, 50],
          hasNext: meta?.hasNextPage,
          hasPrev: meta?.hasPrevPage,
          onPageChange: handlePageChange,
          onPageSizeChange: handleLimitChange,
        }}
      />
    </div>
  );
}
