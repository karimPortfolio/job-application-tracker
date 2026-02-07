"use client";

import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Funnel, FunnelX, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import {
  useFiltersBar,
  type FilterGroup,
  type FilterValue,
} from "../../hooks/useFiltersBar";
import { FilterField } from "./FilterField";
import { ExportButton } from "../exports/ExportButton";

const EMPTY_FILTERS: Record<string, FilterValue> = {};
const EMPTY_FILTER_GROUPS: FilterGroup[] = [];

const areFiltersEqual = (
  next: Record<string, FilterValue>,
  current: Record<string, FilterValue>,
) => {
  const normalize = (obj: Record<string, FilterValue>) =>
    Object.keys(obj)
      .sort()
      .reduce<Record<string, FilterValue>>((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});

  return JSON.stringify(normalize(next)) === JSON.stringify(normalize(current));
};

export type FiltersBarProps = {
  search?: string;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  filters?: FilterGroup[];
  selectedFilters?: Record<string, FilterValue>;
  onFiltersChange?: (next: Record<string, FilterValue>) => void;
  onRefresh?: () => Promise<void> | void;
  isRefreshing?: boolean;
  onReset?: () => void;
  endpoint?: string | undefined;
  filename?: string | undefined;
};

export function FiltersBar({
  search = "",
  onSearch,
  searchPlaceholder = "Search...",
  filters = EMPTY_FILTER_GROUPS,
  selectedFilters,
  onFiltersChange,
  onRefresh,
  isRefreshing = false,
  onReset,
  endpoint,
  filename,
}: FiltersBarProps) {
  const {
    search: searchValue,
    setSearch: setSearchValue,
    selectedFilters: selectedFiltersState,
    setSelectedFilters,
    selectedCount,
    toggleFilter,
    setFilterValue,
    clearFilters,
    submitSearch,
    isRefreshing: refreshingFromHook,
    refresh,
  } = useFiltersBar({
    filters,
    initialSearch: search,
    initialSelected: selectedFilters ?? EMPTY_FILTERS,
    onChange: useCallback(
      ({
        search: nextSearch,
        filters: nextFilters,
      }: {
        search: string;
        filters: Record<string, FilterValue>;
      }) => {
        onSearch?.(nextSearch);
        onFiltersChange?.(nextFilters);
      },
      [onFiltersChange, onSearch],
    ),
    onRefresh,
  });

  useEffect(() => {
    setSearchValue(search);
  }, [search, setSearchValue]);

  useEffect(() => {
    if (!selectedFilters) return;
    if (!areFiltersEqual(selectedFilters, selectedFiltersState)) {
      setSelectedFilters(selectedFilters);
    }
  }, [selectedFilters, selectedFiltersState, setSelectedFilters]);

  const handleToggle = (groupKey: string, value: string, multi: boolean) => {
    toggleFilter(groupKey, value, multi);
  };

  const handleClearFilters = () => {
    clearFilters();
    onReset?.();
    submitSearch({ filters: {} });
  };

  const isButtonRefreshing = onRefresh ? refreshingFromHook : isRefreshing;
  const handleRefresh = onRefresh ? refresh : onRefresh;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 ">
      <div className="flex items-center gap-2 flex-1 min-w-60 sm:max-w-md">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitSearch();
            }
          }}
          placeholder={searchPlaceholder}
          className="h-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              {selectedCount > 0 ? (
                <Badge variant="secondary" className="text-xs">
                  {selectedCount}
                </Badge>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 space-y-4 p-3">
            {filters.map((group) => {
              const value = selectedFiltersState[group.key];
              return (
                <FilterField
                  key={group.key}
                  group={group}
                  value={value}
                  onChange={(val) => setFilterValue(group.key, val)}
                  onToggle={(val) => handleToggle(group.key, val, true)}
                />
              );
            })}

            <div className="flex items-center justify-between gap-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="gap-1"
              >
                <FunnelX className="h-4 w-4" />
                Clear all
              </Button>
              <Button size="sm" onClick={() => submitSearch()}>
                <Funnel className="h-4 w-4" />
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {endpoint ? (
          <ExportButton
            endpoint={endpoint}
            params={selectedFilters}
            filename={filename}
          />
        ) : null}

        {onRefresh ? (
          <Button
            variant="outline"
            className={cn(
              "h-10 gap-2",
              isButtonRefreshing && "animate-pulse",
            )}
            onClick={handleRefresh}
            disabled={isButtonRefreshing}
          >
            <RotateCcw
              className={cn("h-4 w-4", isButtonRefreshing && "animate-spin")}
            />
            <span>Refresh</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
