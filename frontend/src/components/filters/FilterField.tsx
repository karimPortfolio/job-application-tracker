import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FilterGroup, FilterValue } from "@/hooks/useFiltersBar"

export type FilterFieldProps = {
  group: FilterGroup
  value?: FilterValue
  onChange: (value: FilterValue) => void
  onToggle?: (value: string) => void
}

const clearValueForType = (group: FilterGroup): FilterValue => {
  if (group.type === "boolean") return false
  if (group.type === "date") return {}
  if (group.type === "enum" || group.type === "relation") return ""
  return [] as string[]
}

const hasValue = (value: FilterValue | undefined) => {
  if (value === undefined) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === "boolean") return value
  if (typeof value === "string") return value !== ""
  if (value && typeof value === "object") {
    const range = value as { start?: string; end?: string }
    return Boolean(range.start || range.end)
  }
  return false
}

export function FilterField({ group, value, onChange, onToggle }: FilterFieldProps) {
  const renderControl = () => {
    if (group.type === "boolean") {
      const checked = Boolean(value)
      return (
        <div className="flex items-center gap-2 py-1">
          <Checkbox
            checked={checked}
            onCheckedChange={(val) => onChange(Boolean(val))}
          />
          <span className="text-sm">{group.label}</span>
        </div>
      )
    }

    if (group.type === "string") {
      const current = (value as string | undefined) ?? ""
      return (
        <Input
          value={current}
          onChange={(e) => onChange(e.target.value)}
          placeholder={group.label}
        />
      )
    }

    if (group.type === "enum" || group.type === "relation") {
      const options = group.options ?? []
      const current = (value as string | undefined) ?? ""
      return (
        <Select
          value={current}
          onValueChange={(val) => onChange(val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${group.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent className="w-full">
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (group.type === "date") {
      const range = (value as { start?: string; end?: string }) ?? {}
      return (
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={range.start ?? ""}
            onChange={(e) => onChange({ ...range, start: e.target.value })}
          />
          <Input
            type="date"
            value={range.end ?? ""}
            onChange={(e) => onChange({ ...range, end: e.target.value })}
          />
        </div>
      )
    }

    if (group.type === "string") {
        return (
        <Input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${group.label.toLowerCase()}`}
        />
      )
    }

    const options = group.options ?? []
    const current = (value as string[]) ?? []
    return (
      <div className="space-y-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={current.includes(opt.value)}
              onCheckedChange={() => onToggle?.(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    )
  }

  const showClear = hasValue(value)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{group.label}</span>
        {showClear ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(clearValueForType(group))}
          >
            Clear
          </Button>
        ) : null}
      </div>
      {renderControl()}
    </div>
  )
}
