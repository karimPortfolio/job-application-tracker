"use client";

import { useEffect, useState } from "react";
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
import { Search, X } from "lucide-react";
import type { JobQuery } from "@/features/jobs/types/jobs.types";

interface PublicJobsSearchBarProps {
  query: JobQuery;
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
  loading,
  onSearchSubmit,
  onEmploymentTypeChange,
  onExperienceLevelChange,
  onRemoteChange,
  onReset,
}: PublicJobsSearchBarProps) {
  const [searchInput, setSearchInput] = useState(query.search ?? "");

  useEffect(() => {
    setSearchInput(query.search ?? "");
  }, [query.search]);

  const submitSearch = () => {
    onSearchSubmit(searchInput.trim());
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex flex-col md:flex-row items-center gap-5 w-full mb-5 md:mb-0">
          <div className="relative w-full md:w-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitSearch();
                }
              }}
              placeholder="Search by job title, company, or keyword"
              className="pl-9 md:w-96"
              aria-label="Search jobs"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 w-full md:grid-cols-2 lg:grid-cols-3">
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
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                {JOB_EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="true">Remote only</SelectItem>
                <SelectItem value="false">On-site / hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={loading}
          className="w-full lg:w-auto"
        >
          <X className="mr-2 size-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
