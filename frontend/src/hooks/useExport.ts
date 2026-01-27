// hooks/use-export.ts
import { useState } from 'react'
import { api } from '@/lib/api/axios'

export type ExportFormat = 'csv' | 'xlsx'

interface ExportOptions {
  endpoint: string         
  format: ExportFormat
  params?: Record<string, any>
  filename?: string
}

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)

  const exportFile = async ({
    endpoint,
    format,
    params = {},
    filename,
  }: ExportOptions) => {
    try {
      setIsExporting(true)

      const response = await api.get(endpoint, {
        params: {
          format,
          ...params,
        },
        responseType: 'blob',
      })

      const mimeType =
        format === 'csv'
          ? 'text/csv'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

      const blob = new Blob([response.data], {
        type: mimeType,
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download =
        filename ?? `export.${format}`

      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportFile,
    isExporting,
  }
}
