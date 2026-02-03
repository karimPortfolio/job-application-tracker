import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { PassThrough } from 'stream';

@Injectable()
export class ApplicationsXlsxExporter {
  async export(candidates: any[]) {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('Candidates');

    sheet.columns = [
      { header: 'Full Name', key: 'fullName', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone Number', key: 'phoneNumber', width: 18 },
      { header: 'LinkedIn URL', key: 'linkedInUrl', width: 25 },
      { header: 'GitHub URL', key: 'githubUrl', width: 25 },
      { header: 'Portfolio URL', key: 'portfolioUrl', width: 25 },
      { header: 'Resume URL', key: 'resumeUrl', width: 25 },
      { header: 'Country', key: 'country', width: 15 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Job Title', key: 'jobTitle', width: 20 },
      { header: 'Company Name', key: 'companyName', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Stage', key: 'stage', width: 20 },
      { header: 'Source', key: 'source', width: 15 },
      { header: 'Applied At', key: 'appliedAt', width: 20 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'AI Score', key: 'aiScore', width: 10 },
      { header: 'Notes', key: 'notes', width: 30 },
    ];

    candidates.forEach((candidate) => {
      const status = candidate.status ? capitalize(candidate.status) : 'N/A';
      const stage = candidate.stage ? capitalize(candidate.stage) : 'N/A';

      sheet.addRow({
        fullName: candidate.fullName ?? 'N/A',
        email: candidate.email ?? 'N/A',
        phoneNumber: candidate.phoneNumber ?? 'N/A',
        linkedInUrl: candidate.linkedInUrl ?? 'N/A',
        githubUrl: candidate.githubUrl ?? 'N/A',
        portfolioUrl: candidate.portfolioUrl ?? 'N/A',
        resumeUrl: candidate.resumeUrl ?? 'N/A',
        country: candidate.country ?? 'N/A',
        city: candidate.city ?? 'N/A',
        jobTitle: candidate.jobTitle ?? 'N/A',
        companyName: candidate.companyName ?? 'N/A',
        status,
        stage,
        source: candidate.source ?? 'N/A',
        appliedAt:
          candidate.appliedAt?.toISOString?.() ||
          candidate.appliedAt ||
          'N/A',
        rating: candidate.rating ?? 'N/A',
        aiScore: candidate.aiScore ?? 'N/A',
        notes: candidate.notes ?? 'N/A',
      });
    });

    const stream = new PassThrough();
    await workbook.xlsx.write(stream);

    return stream;
  }
}

function capitalize(value: string) {
  const str = String(value);
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
}
