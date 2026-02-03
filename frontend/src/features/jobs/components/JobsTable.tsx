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

import {
  ArrowRightLeft,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";

import { useTextTruncate } from "@/hooks/useTextTruncate";
import { FiltersBar } from "@/components/filters/FiltersBar";
import type { FilterGroup } from "@/hooks/useFiltersBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useMemo, useState, useCallback, type Dispatch, type SetStateAction } from "react";
import { Job, JobQuery, JobStatus } from "../types/jobs.types";
import { useJobActions } from "../hooks/useJobsActions";
import { JOBS_ROUTES } from "../routes/jobs.routes";
import { cn } from "@/lib/utils";
import { JOB_STATUSES } from "../constants/job-constants";
import { Department } from "@/features/departments/types/departments.types";
import { useSorting } from "../hooks/useSorting";
import { useFilters } from "../hooks/useFilters";

interface JobsTableProps {
  jobs: Job[];
  meta: any; // TODO: type properly
  loading: boolean;
  query: JobQuery;
  setQuery: Dispatch<SetStateAction<JobQuery>>;
  refetch?: () => Promise<any>;
  onEdit?: (job: Job) => void;
  onChangeStatus?: (job: Job) => void;
  onView?: (job: Job) => void;
}

export function JobsTable({
  jobs,
  meta,
  loading,
  query,
  setQuery,
  refetch,
  onEdit,
  onChangeStatus,
  onView,
}: JobsTableProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const {
    confirmDelete,
    loading: isDeleting,
    refetchJobsDepartments,
  } = useJobActions(refetch);
  const { user } = useAuth();
  const { handleSortChange } = useSorting(setQuery);
  const { handleFiltersChange, handleResetFilters, handleSearch } =
    useFilters(setQuery);

  const handlePageChange = (page: number) => {
    const totalPages = meta?.totalPages ?? 1;
    const safe = Math.min(Math.max(page, 1), totalPages);
    setQuery((prev) => ({ ...prev, page: safe }));
  };

  const handleLimitChange = (value: number) => {
    setQuery((prev) => ({ ...prev, limit: value, page: 1 }));
  };

  const fileName = useMemo(() => {
    if (user?.company && user?.company.name) {
      const sanitizedCompanyName = user.company.name
        .toLowerCase()
        .replace(/\s+/g, "_");
      return `${sanitizedCompanyName}_jobs_export`;
    }

    return `jobs_export`;
  }, [user?.company.name]);

  const jobStatusMap = useMemo(() => {
    const map: Record<string, { label: string; colorClass: string }> = {};
    for (const s of JOB_STATUSES) map[s.value] = s;
    return map;
  }, [JOB_STATUSES]);

  useEffect(() => {
    async function loadDepartments() {
      const depts = await refetchJobsDepartments();
      setDepartments(depts);
    }

    loadDepartments();
  }, []);

  const filters: FilterGroup[] = useMemo(
    () => [
      {
        key: "department",
        type: "relation",
        label: "Department",
        options:
          departments.map((dept) => ({ label: dept.title, value: dept._id })) ??
          [],
      },
      {
        key: "status",
        type: "enum",
        label: "Status",
        options: JOB_STATUSES,
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
      },
      {
        key: "createdAt",
        type: "date",
        label: "Created Date",
      },
    ],
    [departments],
  );

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
            <span className="flex text-gray-600 dark:text-gray-400">
              {row.department?.title || ""}
            </span>
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
                onClick={() => onView?.(row)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit?.(row)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onChangeStatus?.(row)}
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Change Status
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
    [onEdit, isDeleting, confirmDelete, JOB_STATUSES],
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
          if (refetch) await refetch();
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
