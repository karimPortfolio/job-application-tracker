import { Injectable } from '@nestjs/common'
import { Workbook } from 'exceljs'
import { PassThrough } from 'stream'

@Injectable()
export class DepartmentsXlsxExporter {
  async export(departments: any[]) {
    const workbook = new Workbook()
    const sheet = workbook.addWorksheet('Departments')

    sheet.columns = [
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Jobs Posted', key: 'jobsCount', width: 15 },
      { header: 'Creation details', key: 'createdAtDiff', width: 25 },
    ]

    departments.forEach((dep) => {
      sheet.addRow({
        title: dep.title,
        jobsCount: dep.jobsCount ?? 0,
        createdAtDiff: dep.createdAtDiff || dep.createdAt.toISOString(),
      })
    })

    const stream = new PassThrough()
    await workbook.xlsx.write(stream)

    return stream
  }
}
