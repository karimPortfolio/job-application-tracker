import { Injectable } from '@nestjs/common'
import { PassThrough } from 'stream'
import { stringify } from 'csv-stringify'

@Injectable()
export class DepartmentsCsvExporter {
  export(departments: any[]) {
    const stream = new PassThrough()

    const csv = stringify({
      header: true,
      columns: [
        { key: 'title', header: 'Title' },
        { key: 'jobsCount', header: 'Jobs Posted' },
        { key: 'createdAtDiff', header: 'Creation details' },
      ],
    })

    csv.pipe(stream)

    for (const dep of departments) {
      csv.write({
        title: dep.title,
        jobsCount: dep.jobsCount ?? 0,
        createdAtDiff: dep.createdAtDiff || dep.createdAt.toISOString(),
      })
    }

    csv.end()

    return stream
  }
}
