import { JobQueryDto } from '../dto/job-query.dto';

export function buildJobFilter(company: string, query: JobQueryDto) {
  const filter: any = {
    company,
  };

  //====== exact filters
  if (query.department) {
    filter.department = query.department;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.employmentType) {
    filter.employmentType = query.employmentType;
  }

  if (query.experienceLevel) {
    filter.experienceLevel = query.experienceLevel;
  }

  if (typeof query.isRemote === 'boolean') {
    filter.isRemote = query.isRemote;
  }

  //====== search (title + description)
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  //====== date range
  if (query.createdAtStart || query.createdAtEnd) {
    filter.createdAt = {};

    if (query.createdAtStart) {
      filter.createdAt.$gte = new Date(query.createdAtStart);
    }

    if (query.createdAtEnd) {
      filter.createdAt.$lte = new Date(query.createdAtEnd);
    }
  }

  return filter;
}
