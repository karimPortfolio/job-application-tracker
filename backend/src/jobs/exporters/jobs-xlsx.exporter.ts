import { Injectable } from '@nestjs/common'
import { Workbook } from 'exceljs'
import { PassThrough } from 'stream'

@Injectable()
export class JobsXlsxExporter {
  async export(jobs: any[]) {
    const workbook = new Workbook()
    const sheet = workbook.addWorksheet('Jobs')

    sheet.columns = [
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Country', key: 'country', width: 15 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Employment Type', key: 'employmentType', width: 20 },
      { header: 'Experience Level', key: 'experienceLevel', width: 18 },
      { header: 'Remote', key: 'isRemote', width: 10 },
      { header: 'Salary Min', key: 'salaryMin', width: 15 },
      { header: 'Salary Max', key: 'salaryMax', width: 15 },
      { header: 'Department', key: 'department', width: 20 },
      { header: 'Applicants', key: 'applicants', width: 20 },
      { header: 'Creation details', key: 'createdAtDiff', width: 25 },
    ]

    jobs.forEach((job) => {
      const status = job.status ? capitalize(job.status) : 'N/A'
      const employmentType = job.employmentType ? capitalize(job.employmentType) : 'N/A'
      const experienceLevel = job.experienceLevel ? capitalize(job.experienceLevel) : 'N/A'
      const country = job.country ? capitalize(job.country) : 'N/A'
      const city = job.city ? capitalize(job.city) : 'N/A'

      sheet.addRow({
        title: job.title,
        status,
        employmentType,
        experienceLevel,
        isRemote: job.isRemote ? 'Yes' : 'No',
        country,
        city,
        department: job.departmentTitle ?? 'N/A',
        createdAtDiff: job.createdAtDiff || job.createdAt?.toISOString?.() || 'N/A',
        salaryMin: job.salaryMin ?? 'N/A',
        salaryMax: job.salaryMax ?? 'N/A',
        applicants: job.applicationsCount ?? 0,
      })
    })

    const stream = new PassThrough()
    await workbook.xlsx.write(stream)

    return stream
  }
}

function capitalize(value: string) {
  const str = String(value)
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str
}
