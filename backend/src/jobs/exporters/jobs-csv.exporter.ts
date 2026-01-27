import { Injectable } from '@nestjs/common'
import { PassThrough } from 'stream'
import { stringify } from 'csv-stringify'

@Injectable()
export class JobsCsvExporter {
  export(jobs: any[]) {
    const stream = new PassThrough()

    const csv = stringify({
      header: true,
      columns: [
        { key: 'title', header: 'Title' },
        { key: 'country', header: 'Country' },
        { key: 'city', header: 'City' },
        { key: 'status', header: 'Status' },
        { key: 'employmentType', header: 'Employment Type' },
        { key: 'experienceLevel', header: 'Experience Level' },
        { key: 'isRemote', header: 'Remote' },
        { key: 'salaryMin', header: 'Salary Min' },
        { key: 'salaryMax', header: 'Salary Max' },
        { key: 'department', header: 'Department' },
        { key: 'applicants', header: 'Applicants' },
        { key: 'createdAtDiff', header: 'Creation details' },
      ],
    })

    csv.pipe(stream)

    for (const job of jobs) {
      const status = job.status ? capitalize(job.status) : 'N/A'
      const employmentType = job.employmentType ? capitalize(job.employmentType) : 'N/A'
      const experienceLevel = job.experienceLevel ? capitalize(job.experienceLevel) : 'N/A'
      const country = job.country ? capitalize(job.country) : 'N/A'
      const city = job.city ? capitalize(job.city) : 'N/A'

      csv.write({
        title: job.title,
        status,
        employmentType,
        experienceLevel,
        isRemote: job.isRemote ? 'Yes' : 'No',
        country,
        city,
        salaryMin: job.salaryMin ?? 'N/A',
        salaryMax: job.salaryMax ?? 'N/A',
        department: job.departmentTitle ?? 'N/A',
        applicants: job.applicationsCount ?? 0,
        createdAtDiff: job.createdAtDiff || job.createdAt?.toISOString?.() || 'N/A',
      })
    }

    csv.end()

    return stream
  }
}

function capitalize(value: string) {
  const str = String(value)
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str
}
