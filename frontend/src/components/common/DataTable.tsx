"use client"

import { ReactNode, useEffect, useMemo, useState } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"

type Align = "left" | "center" | "right"

export type DataTableColumn<T> = {
	key: keyof T | string
	label: string
	align?: Align
	className?: string
	width?: string
	render?: (row: T, index: number) => ReactNode
	sortable?: boolean
	sortAccessor?: (row: T) => any
}

export type SortDirection = "asc" | "desc"

export type DataTableSort = {
	key: string
	direction: SortDirection
}

export type DataTablePagination = {
	page: number
	totalPages: number
	totalItems?: number
	pageSize?: number
	pageSizeOptions?: number[]
	hasNext?: boolean
	hasPrev?: boolean
	onPageChange?: (page: number) => void
	onPageSizeChange?: (pageSize: number) => void
}

type DataTableProps<T> = {
	data: T[]
	columns: DataTableColumn<T>[]
	loading?: boolean
	emptyMessage?: string
	rowKey?: (row: T, index: number) => string
	caption?: ReactNode
	striped?: boolean
	onRowClick?: (row: T) => void
	footer?: ReactNode
	pagination?: DataTablePagination
	defaultSort?: DataTableSort
	onSortChange?: (sort: DataTableSort | null) => void
	remoteSort?: boolean
}

const alignMap: Record<Align, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
}

export function DataTable<T>({
	data,
	columns,
	loading = false,
	emptyMessage = "No records found.",
	rowKey,
	caption,
	striped = true,
	onRowClick,
	footer,
	pagination,
	defaultSort,
	onSortChange,
	remoteSort = false,
}: DataTableProps<T>) {
	const [sort, setSort] = useState<DataTableSort | null>(defaultSort ?? null)

	useEffect(() => {
		setSort(defaultSort ?? null)
	}, [defaultSort?.key, defaultSort?.direction])

	const sortedData = useMemo(() => {
		if (remoteSort) return data
		if (!sort) return data
		const column = columns.find((col) => String(col.key) === sort.key)
		if (!column) return data
		const accessor = column.sortAccessor ?? ((row: T) => (row as any)[sort.key])
		const safeValue = (value: any) => {
			if (value === undefined || value === null) return ""
			return value
		}

		return [...data].sort((a, b) => {
			const aVal = safeValue(accessor(a))
			const bVal = safeValue(accessor(b))
			const direction = sort.direction === "asc" ? 1 : -1

			if (typeof aVal === "number" && typeof bVal === "number") {
				return (aVal - bVal) * direction
			}

			return String(aVal).localeCompare(String(bVal)) * direction
		})
	}, [columns, data, remoteSort, sort])

	const handleSort = (key: string) => {
		let next: DataTableSort | null = { key, direction: "asc" }

		if (sort?.key === key) {
			next = sort.direction === "asc" ? { key, direction: "desc" } : null
		}

		setSort(next)
		onSortChange?.(next)
	}

	const getKey = (row: T, index: number) => {
		if (rowKey) return rowKey(row, index)
		const fallback = (row as any)?._id ?? (row as any)?.id
		return fallback ? String(fallback) : String(index)
	}

	const pageSizeOptions = pagination?.pageSizeOptions ?? [5, 10, 20, 50]
	const canGoPrev = pagination ? (pagination.hasPrev ?? pagination.page > 1) : false
	const canGoNext = pagination
		? pagination.hasNext ?? pagination.page < pagination.totalPages
		: false

	const handlePrev = () => {
		if (!pagination?.onPageChange || !pagination) return
		const nextPage = Math.max(1, pagination.page - 1)
		pagination.onPageChange(nextPage)
	}

	const handleNext = () => {
		if (!pagination?.onPageChange || !pagination) return
		const nextPage = Math.min(pagination.page + 1, pagination.totalPages)
		pagination.onPageChange(nextPage)
	}

	if (loading) {
		return (
			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((col) => (
								<TableHead key={String(col.key)}>{col.label}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 5 }).map((_, i) => (
							<TableRow key={i}>
								{columns.map((col) => (
									<TableCell key={String(col.key)}>
										<Skeleton className="h-4 w-full" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		)
	}

	if (!data.length) {
		return (
			<div className="rounded-lg border bg-white p-6 text-center text-sm text-muted-foreground">
				{emptyMessage}
			</div>
		)
	}

	const footerContent = footer
		? <div className="border-t px-4 py-3">{footer}</div>
		: pagination ? (
			<div className="border-t px-4 py-3 flex flex-wrap items-center justify-between gap-3">
				<div className="text-sm text-muted-foreground">
					Total: {pagination.totalItems ?? data.length}
				</div>

				<div className="flex items-center text-sm gap-2">
					Rows per page:{" "}
					<Select
						value={String(pagination.pageSize ?? pageSizeOptions[0])}
						onValueChange={(val) => pagination.onPageSizeChange?.(Number(val))}
						disabled={!pagination.onPageSizeChange}
					>
						<SelectTrigger className="h-9 w-24">
							<SelectValue placeholder="Rows" />
						</SelectTrigger>
						<SelectContent>
							{pageSizeOptions.map((opt) => (
								<SelectItem key={opt} value={String(opt)}>
									{opt}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Pagination className="w-auto">
						<PaginationContent>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault()
									if (canGoPrev) handlePrev()
								}}
								aria-disabled={!canGoPrev}
								className={cn(!canGoPrev && "pointer-events-none opacity-50")}
							/>

							<PaginationItem>
								<span className="px-2 text-sm text-muted-foreground">
									Page {pagination.page} of {pagination.totalPages}
								</span>
							</PaginationItem>

							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault()
									if (canGoNext) handleNext()
								}}
								aria-disabled={!canGoNext}
								className={cn(!canGoNext && "pointer-events-none opacity-50")}
							/>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		) : null

	return (
		<div className="overflow-hidden rounded-lg border ">
			<Table>
				{caption ? (
					<caption className="px-4 py-3 text-left text-sm text-muted-foreground">
						{caption}
					</caption>
				) : null}
				<TableHeader>
					<TableRow>
						{columns.map((col) => {
							const isSorted = sort?.key === String(col.key)
							const direction = isSorted ? sort?.direction : undefined
							return (
								<TableHead
									key={String(col.key)}
									className={cn(
										col.align && alignMap[col.align],
										col.className,
										col.sortable && "cursor-pointer select-none"
									)}
									style={col.width ? { width: col.width } : undefined}
									aria-sort={
										isSorted ? (direction === "asc" ? "ascending" : "descending") : "none"
									}
									onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
								>
									<span className="flex items-center gap-1 text-sm font-medium">
										{col.label}
										{col.sortable ? (
											<span className="text-xs text-muted-foreground">
												{direction === "asc" ? "▲" : direction === "desc" ? "▼" : "⇅"}
											</span>
										) : null}
									</span>
								</TableHead>
							)
						})}
					</TableRow>
				</TableHeader>

				<TableBody>
					{sortedData.map((row, index) => (
						<TableRow
							key={getKey(row, index)}
							className={cn(
								onRowClick && "cursor-pointer hover:bg-slate-50"
							)}
							onClick={onRowClick ? () => onRowClick(row) : undefined}
						>
							{columns.map((col) => (
								<TableCell
									key={String(col.key)}
									className={cn(col.align && alignMap[col.align], col.className)}
								>
									{col.render ? col.render(row, index) : (row as any)[col.key as string]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			{footerContent}
		</div>
	)
}
