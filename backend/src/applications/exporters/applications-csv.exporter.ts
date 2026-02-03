import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { stringify } from 'csv-stringify';

@Injectable()
export class ApplicationsCsvExporter {
  export(applications: any[]) {
    const stream = new PassThrough();

    const csv = stringify({
      header: true,
      columns: [
        { key: 'fullName', header: 'Full Name' },
        { key: 'email', header: 'Email' },
        { key: 'phoneNumber', header: 'Phone Number' },
        { key: 'linkedInUrl', header: 'LinkedIn URL' },
        { key: 'githubUrl', header: 'GitHub URL' },
        { key: 'portfolioUrl', header: 'Portfolio URL' },
        { key: 'resumeUrl', header: 'Resume URL' },
        { key: 'country', header: 'Country' },
        { key: 'city', header: 'City' },
        { key: 'jobTitle', header: 'Job Title' },
        { key: 'companyName', header: 'Company Name' },
        { key: 'status', header: 'Status' },
        { key: 'stage', header: 'Stage' },
        { key: 'source', header: 'Source' },
        { key: 'appliedAt', header: 'Applied At' },
        { key: 'rating', header: 'Rating' },
        { key: 'aiScore', header: 'AI Score' },
        { key: 'notes', header: 'Notes' },
      ],
    });

    csv.pipe(stream);

    for (const application of applications) {
      const status = application.status ? capitalize(application.status) : 'N/A';
      const stage = application.stage ? capitalize(application.stage) : 'N/A';

      csv.write({
        fullName: application.fullName ?? 'N/A',
        email: application.email ?? 'N/A',
        phoneNumber: application.phoneNumber ?? 'N/A',
        linkedInUrl: application.linkedInUrl ?? 'N/A',
        githubUrl: application.githubUrl ?? 'N/A',
        portfolioUrl: application.portfolioUrl ?? 'N/A',
        resumeUrl: application.resumeUrl ?? 'N/A',
        country: application.country ?? 'N/A',
        city: application.city ?? 'N/A',
        jobTitle: application.jobTitle ?? 'N/A',
        companyName: application.companyName ?? 'N/A',
        status,
        stage,
        source: application.source ?? 'N/A',
        appliedAt:
          application.appliedAt?.toISOString?.() ||
          application.appliedAt ||
          'N/A',
        rating: application.rating ?? 'N/A',
        aiScore: application.aiScore ?? 'N/A',
        notes: application.notes ?? 'N/A',
      });
    }

    csv.end();

    return stream;
  }
}

function capitalize(value: string) {
  const str = String(value);
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
}
