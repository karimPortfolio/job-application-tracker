'use client'

import { DataTable, type DataTableColumn } from '@/components/common/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react'

import { useDepartmentsList } from '../hooks/useDepartmentsList'
import { Department, DepartmentQuery } from '../types/departments.types'
import { useTextTruncate } from '@/hooks/useTextTruncate'
import { FiltersBar } from '@/components/filters/FiltersBar'
import type { FilterGroup } from '@/hooks/useFiltersBar'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useMemo } from 'react'
import { useDepartmentsActions } from '../hooks/useDepartmentsActions'

interface DepartmentsTableProps {
  onEdit?: (id: string) => void
  onView?: (id: string) => void
  list?: ReturnType<typeof useDepartmentsList>
}

export function DepartmentsTable({ onEdit, onView, list }: DepartmentsTableProps) {
  const {
    departments,
    loading,
    meta,
    query,
    setQuery,
    refetch,
  } = list ?? useDepartmentsList()
  const { confirmDelete, loading: isDeleting } = useDepartmentsActions()
  const { truncate } = useTextTruncate()
  const { user } = useAuth();

  const handlePageChange = (page: number) => {
    const totalPages = meta?.totalPages ?? 1
    const safe = Math.min(Math.max(page, 1), totalPages)
    setQuery((prev) => ({ ...prev, page: safe }))
  }

  const handleLimitChange = (value: number) => {
    setQuery((prev) => ({ ...prev, limit: value, page: 1 }))
  }

  const handleSearch = (term: string) => {
    setQuery((prev) => ({ ...prev, search: term, page: 1 }))
  }

  const handleSortChange = (sort: { key: string; direction: 'asc' | 'desc' } | null) => {
    const sortKey: DepartmentQuery['sortBy'] = sort?.key === 'title' ? 'title' : 'createdAt'
    const order: DepartmentQuery['order'] = sort?.direction ?? 'desc'

    setQuery((prev) => ({
      ...prev,
      sortBy: sortKey,
      order,
      page: 1,
    }))
  }

  const filters: FilterGroup[] = [
    { key: 'status', type: 'enum', label: 'Status', options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]},
  ]

  const handleFiltersChange = (next: Record<string, unknown>) => {
    const statusVal = typeof next.status === 'string' ? next.status : undefined
    setQuery((prev) => ({ ...prev, status: statusVal, page: 1 }))
  }

  const handleResetFilters = () => {
    setQuery((prev) => ({ ...prev, status: undefined, page: 1 }))
  }

  const fileName = useMemo(() => {
    if (user?.company && user?.company.name) {
      const sanitizedCompanyName = user.company.name.toLowerCase().replace(/\s+/g, '_');
      return `${sanitizedCompanyName}_departments_export`;
    }

    return `departments_export`;
  }, [user?.company.name]);

  const endpoint = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_API_VERSION || ''}/departments/export`;
  }, []);

  const columns: DataTableColumn<Department>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (row) => <span className="font-semibold text-gray-900 dark:text-gray-100">{row.title}</span>,
    },
    {
      key: 'description',
      label: 'Description',
      render: (row) => (
        <span className="text-sm text-gray-700 dark:text-gray-400" title={row.description || ''}>
          {row.description ? truncate(row.description, 70) : 'N/A'}
        </span>
      ),
    },
    { 
      key: 'jobsCount',
      label: 'Jobs',
      render: (row) => (
        <Badge variant="secondary" className="font-mono text-white text-xs">
          {row.jobsCount ?? 0} posted
        </Badge>
      ),
    },
    { 
      key: 'createdAtDiff',
      label: 'Creation details',
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-700 dark:text-gray-400" title={row.description || ''}>
          {row.createdAtDiff || row.createdAt}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'left',
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className='cursor-pointer' onClick={() => onView?.(row._id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => onEdit?.(row._id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant='destructive'
              className='cursor-pointer'
              disabled={isDeleting}
              onClick={async () => {
                await confirmDelete(row)
                await refetch()
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <FiltersBar
        search={query.search ?? ""}
        onSearch={handleSearch}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
        onRefresh={async () => {
          await refetch()
        }}
        endpoint={endpoint}
        filename={fileName}
      />
      <DataTable
        data={departments}
        columns={columns}
        loading={loading}
        striped
        emptyMessage="No departments found."
        remoteSort
        defaultSort={{ key: query.sortBy ?? 'createdAt', direction: (query.order as 'asc' | 'desc') ?? 'desc' }}
        onSortChange={handleSortChange}
        pagination={{
          page: meta?.page ?? 1,
          totalPages: meta?.totalPages ?? 1,
          totalItems: meta?.totalDocs ?? departments.length,
          pageSize: query.limit ?? 10,
          pageSizeOptions: [5, 10, 20, 50],
          hasNext: meta?.hasNextPage,
          hasPrev: meta?.hasPrevPage,
          onPageChange: handlePageChange,
          onPageSizeChange: handleLimitChange,
        }}
      />
    </div>
  )
}
