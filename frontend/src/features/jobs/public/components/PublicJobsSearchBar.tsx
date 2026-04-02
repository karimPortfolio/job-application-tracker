"use client";

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
  onSearchChange: (value: string) => void;
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
  onSearchChange,
  onEmploymentTypeChange,
  onExperienceLevelChange,
  onRemoteChange,
  onReset,
}: PublicJobsSearchBarProps) {
  return (
    <div className="rounded-2xl border bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query.search ?? ""}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by job title, company, or keyword"
              className="pl-9 md:w-96"
              aria-label="Search jobs"
            />
          </div>

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
            <SelectTrigger>
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
            <SelectTrigger>
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
            <SelectTrigger>
              <SelectValue placeholder="Remote" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              <SelectItem value="true">Remote only</SelectItem>
              <SelectItem value="false">On-site / hybrid</SelectItem>
            </SelectContent>
          </Select>
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
