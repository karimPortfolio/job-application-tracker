import { useEffect, useMemo, useRef, useState } from "react"

export type FilterOption = { label: string; value: string }

export type FilterType = "boolean" | "enum" | "relation" | "date" | "string"

export type FilterValue = string | string[] | boolean | { start?: string; end?: string }

export type FilterGroup = {
  key: string
  label: string
  type: FilterType
  options?: FilterOption[]
  multi?: boolean
}

export type UseFiltersBarOptions = {
  filters?: FilterGroup[]
  initialSearch?: string
  initialSelected?: Record<string, FilterValue>
  onChange?: (state: { search: string; filters: Record<string, FilterValue> }) => void
  onRefresh?: () => Promise<void> | void
}

export function useFiltersBar({
  filters = [],
  initialSearch = "",
  initialSelected = {},
  onChange,
  onRefresh,
}: UseFiltersBarOptions = {}) {
  const [search, setSearch] = useState(initialSearch)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, FilterValue>>(initialSelected)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const submitSearch = (overrides?: { search?: string; filters?: Record<string, FilterValue> }) => {
    const nextSearch = overrides?.search ?? search
    const nextFilters = overrides?.filters ?? selectedFilters
    onChangeRef.current?.({ search: nextSearch, filters: nextFilters })
  }

  const selectedCount = useMemo(() => {
    return Object.values(selectedFilters).reduce((total, value) => {
      if (Array.isArray(value)) return total + value.length
      if (typeof value === "boolean") return total + (value ? 1 : 0)
      if (typeof value === "string") return total + (value ? 1 : 0)
      if (value && typeof value === "object") {
        const range = value as { start?: string; end?: string }
        return total + ((range.start || range.end) ? 1 : 0)
      }
      return total
    }, 0)
  }, [selectedFilters])

  const toggleFilter = (groupKey: string, value: string, multi: boolean) => {
    setSelectedFilters((prev) => {
      const current = (prev[groupKey] as string[] | undefined) ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]

      return { ...prev, [groupKey]: multi ? next : [value] }
    })
  }

  const setFilterValue = (groupKey: string, value: FilterValue) => {
    setSelectedFilters((prev) => ({ ...prev, [groupKey]: value }))
  }

  const clearFilters = () => {
    setSelectedFilters({})
  }

  const refresh = async () => {
    if (!onRefresh) return
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return {
    filters,
    search,
    setSearch,
    selectedFilters,
    setSelectedFilters,
    selectedCount,
    toggleFilter,
    setFilterValue,
    clearFilters,
    submitSearch,
    isRefreshing,
    refresh,
  }
}
