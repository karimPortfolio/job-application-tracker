'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

import { useExport, ExportFormat } from '@/hooks/useExport'

interface ExportButtonProps {
  endpoint: string
  params?: Record<string, any>
  filename?: string
  disabled?: boolean
}

export function ExportButton({
  endpoint,
  params,
  filename,
  disabled,
}: ExportButtonProps) {
  const { exportFile, isExporting } = useExport()

  const handleExport = (format: ExportFormat) => {
    exportFile({
      endpoint,
      format,
      params,
      filename,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || isExporting}
          className='h-10'
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleExport('csv')}
        >
          Export CSV
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleExport('xlsx')}
        >
          Export Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
