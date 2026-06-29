"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  JOB_EMPLOYMENT_TYPE_OPTIONS,
  JOB_EXPERIENCE_LEVEL_OPTIONS,
} from "@/features/jobs/constants/job-constants";
import { FunnelX, ListFilter, Search } from "lucide-react";
import type {
  JobQuery,
  PaginatedResponse,
  Job,
} from "@/features/jobs/types/jobs.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { SavedJob } from "@/features/saved-jobs/types/saved-jobs.type";

interface PublicJobsSearchBarProps {
  query: JobQuery;
  meta: PaginatedResponse<Job|SavedJob> | null;
  loading?: boolean;
  onSearchSubmit: (value: string) => void;
  onEmploymentTypeChange: (
    value: JobQuery["employmentType"] | undefined,
  ) => void;
  onExperienceLevelChange: (
    value: JobQuery["experienceLevel"] | undefined,
  ) => void;
  onRemoteChange: (value: boolean | undefined) => void;
  onReset: () => void;
}

export function PublicJobsSearchBar({
  query,
  meta,
  loading,
  onSearchSubmit,
  onEmploymentTypeChange,
  onExperienceLevelChange,
  onRemoteChange,
  onReset,
}: PublicJobsSearchBarProps) {
  const [searchInput, setSearchInput] = useState(query.search ?? "");
  const inputField = useRef<any>(null);

  useEffect(() => {
    setSearchInput(query.search ?? "");
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [query.search]);

  const submitSearch = () => {
    onSearchSubmit(searchInput.trim());
  };

  return (
    <section>
      <div className="mb-12 relative w-full md:w-auto flex justify-center">
        <div className="relative border rounded-lg h-16 w-full md:w-2xl bg-white/90 dark:bg-slate-900/70 flex justify-between items-center py-2 px-2">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by job title, company, or keyword"
            className="pl-9 !border-0 !bg-transparent !outline-0 !ring-0 !text-md shadow-none"
            aria-label="Search jobs"
            ref={inputField}
          />
          <Button className="h-full mr-auto" onClick={submitSearch}>
            <Search className="size-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Possible styling for the above div: rounded-2xl border border-slate-200/80 bg-white/90 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/70  */}
      <div className="flex justify-between items-center gap-5">
        {meta?.totalDocs ? (
          <div className="w-full md:w-auto flex-1 text-sm font-medium ml-1">
            All {meta?.totalDocs} saved jobs found
          </div>
        ) : (
          <div className="w-full md:w-auto flex-1 text-sm font-medium ml-1">
            All 0 saved jobs found
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <ListFilter className="size-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 dark:bg-slate-900">
            <DropdownMenuGroup className="w-auto md:w-full p-3">
              <Label className="mb-3 font-medium">Job Type</Label>
              <Select
                value={query.employmentType ?? "all"}
                onValueChange={(value) =>
                  onEmploymentTypeChange(
                    value === "all"
                      ? undefined
                      : (value as JobQuery["employmentType"]),
                  )
                }
                disabled={loading}
              >
                <SelectTrigger className="w-full mb-5">
                  <SelectValue placeholder="Employment type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900">
                  <SelectItem value="all">All types</SelectItem>
                  {JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className="mb-3 font-medium">Job Level</Label>
              <Select
                value={query.experienceLevel ?? "all"}
                onValueChange={(value) =>
                  onExperienceLevelChange(
                    value === "all"
                      ? undefined
                      : (value as JobQuery["experienceLevel"]),
                  )
                }
                disabled={loading}
              >
                <SelectTrigger className="w-full mb-5">
                  <SelectValue placeholder="Experience level" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900">
                  <SelectItem value="all">All levels</SelectItem>
                  {JOB_EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className="mb-3 font-medium">Job Location</Label>
              <Select
                value={
                  query.isRemote === undefined
                    ? "all"
                    : query.isRemote
                      ? "true"
                      : "false"
                }
                onValueChange={(value) => {
                  if (value === "all") return onRemoteChange(undefined);
                  onRemoteChange(value === "true");
                }}
                disabled={loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Remote" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900">
                  <SelectItem value="all">All locations</SelectItem>
                  <SelectItem value="true">Remote only</SelectItem>
                  <SelectItem value="false">On-site / hybrid</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenuSeparator className="mt-4 mb-3" />
              <Button
                type="button"
                variant="outline"
                onClick={onReset}
                disabled={loading}
                className="w-full"
              >
                <FunnelX className="size-4" />
                Clear Filters
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
