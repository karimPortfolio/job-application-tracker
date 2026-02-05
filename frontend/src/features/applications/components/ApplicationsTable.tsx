"use client";

import { DataTable, type DataTableColumn } from "@/components/common/DataTable";
import { FiltersBar } from "@/components/filters/FiltersBar";
import type { FilterGroup } from "@/hooks/useFiltersBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { cn } from "@/lib/utils";
import { useSorting } from "../hooks/useSorting";
import { useFilters } from "../hooks/useFilters";
import { Application, ApplicationQuery } from "../types/applications.types";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import {
  APPLICATION_STAGES,
  APPLICATION_STATUSES,
} from "../constants/application-constants";
import { APPLICATIONS_ROUTES } from "../routes/applications.routes";
import { JobDetails } from "./table-columns/JobDetails";
import { StatusDetails } from "./table-columns/StatusDetails";
import { ActionsDropdown } from "./table-columns/ActionsDropdown";
import { StageDetails } from "./table-columns/StageDetails";
import { CandidateContact } from "./table-columns/CandidateContact";
import { CandidateResume } from "./table-columns/CandidateResume";
import { Country, useCountries } from "@/shared/hooks/useCountries";
import { SelectItem } from "@/components/ui/select";
import { Job } from "@/features/jobs/types/jobs.types";

interface ApplicationsTableProps {
  applications: Application[];
  meta: any; // TODO: type properly
  loading: boolean;
  query: ApplicationQuery;
  setQuery: Dispatch<SetStateAction<ApplicationQuery>>;
  refetch?: () => Promise<any>;
  onEdit?: (application: Application) => void;
  onChangeStatus?: (application: Application) => void;
  onView?: (application: Application) => void;
}

export function ApplicationsTable({
  applications,
  meta,
  loading,
  query,
  setQuery,
  refetch,
  onEdit,
  onChangeStatus,
  onView,
}: ApplicationsTableProps) {
  const { confirmDelete, loading: isDeleting, applicationsJobs } =
    useApplicationsActions(refetch);
  const { user } = useAuth();
  const { handleSortChange } = useSorting(setQuery);
  const { handleFiltersChange, handleResetFilters, handleSearch } =
    useFilters(setQuery);
  const { countries, loading: countriesLoading } = useCountries();
  const [jobs, setJobs] = useState<{id: string, title: string}[]>([]);

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
      return `${sanitizedCompanyName}_applications_export`;
    }

    return `applications_export`;
  }, [user?.company.name]);

  const applicationStatusMap = useMemo(() => {
    const map: Record<string, { label: string; colorClass: string }> = {};
    for (const s of APPLICATION_STATUSES) map[s.value] = s;
    return map;
  }, [APPLICATION_STATUSES]);

  const applicationStagesMap = useMemo(() => {
    const map: Record<string, { label: string; colorClass: string }> = {};
    for (const s of APPLICATION_STAGES) map[s.value] = s;
    return map;
  }, [APPLICATION_STAGES]);

  const countriesMap = useMemo(() => {
    if (!countries || !Array.isArray(countries)) return [];
    return countries.map((country: Country) => ({
      label: country.name,
      value: country.name,
    }));
  }, [countries]);

  useEffect(() => {
    async function loadJobs() {
      const jobs = await applicationsJobs();
      setJobs(jobs);
    }

    loadJobs();
  }, []);

  const filters: FilterGroup[] = useMemo(
    () => [
      {
        key: "stage",
        type: "enum",
        label: "Stage",
        options: APPLICATION_STAGES,
      },
      {
        key: "status",
        type: "enum",
        label: "Status",
        options: APPLICATION_STATUSES,
      },
      {
        key: "job",
        type: "relation",
        label: "Job",
        options: jobs.map(job => ({ label: job.title, value: job.id })),
      },
      {
        key: "country",
        type: "enum",
        label: "Country",
        options: countriesMap,
      },
      {
        key: "appliedAt",
        type: "date",
        label: "Applied Date",
      },
    ],
    [countriesMap, jobs],
  );

  const columns: DataTableColumn<Application>[] = useMemo(
    () => [
      {
        key: "fullName",
        label: "Candidate Name",
        sortable: true,
        render: (row) => (
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {row.fullName}
          </span>
        ),
      },
      {
        key: "phoneNumber",
        label: "Candidate Contact",
        sortable: true,
        render: (row) => <CandidateContact row={row} />,
      },
      {
        key: "resume",
        label: "Candidate Resume",
        render: (row) => <CandidateResume row={row} />,
      },
      {
        key: "job",
        label: "Job Applied",
        render: (row) => <JobDetails row={row} />,
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
        key: "status",
        label: "Status",
        render: (row) => (
          <StatusDetails
            row={row}
            applicationStatusMap={applicationStatusMap}
          />
        ),
      },
      {
        key: "stage",
        label: "Stage",
        render: (row) => (
          <StageDetails row={row} applicationStagesMap={applicationStagesMap} />
        ),
      },
      {
        key: "createdAtDiff",
        label: "Creation details",
        sortable: true,
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {row.createdAtDiff || row.createdAt}
          </span>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        align: "left",
        render: (row) => (
          <ActionsDropdown
            row={row}
            onEdit={onEdit}
            onView={onView}
            onChangeStatus={onChangeStatus}
            isDeleting={isDeleting}
            confirmDelete={confirmDelete}
          />
        ),
      },
    ],
    [
      onEdit,
      isDeleting,
      confirmDelete,
      APPLICATION_STATUSES,
      APPLICATION_STAGES,
    ],
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
        endpoint={APPLICATIONS_ROUTES.exportApplications}
        filename={fileName}
      />
      <DataTable
        data={applications}
        columns={columns}
        loading={loading}
        striped
        emptyMessage="No applications found."
        remoteSort
        defaultSort={{
          key: query.sortBy ?? "createdAt",
          direction: (query.order as "asc" | "desc") ?? "desc",
        }}
        onSortChange={handleSortChange}
        pagination={{
          page: meta?.page ?? 1,
          totalPages: meta?.totalPages ?? 1,
          totalItems: meta?.totalDocs ?? applications.length,
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
