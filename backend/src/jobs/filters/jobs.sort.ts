import { JobQueryDto } from '../dto/job-query.dto';
import type { SortOrder } from 'mongoose';

export function buildJobSort(query: JobQueryDto): Record<string, SortOrder> {
  const allowed: Array<JobQueryDto['sortBy']> = [
    'createdAt',
    'title',
    'applicationsCount',
    'viewsCount',
  ];

  const sortBy: JobQueryDto['sortBy'] = allowed.includes(query.sortBy as any)
    ? (query.sortBy as JobQueryDto['sortBy'])
    : 'createdAt';

  const orderParam = (query as any).order ?? query.sortOrder; // support both names
  const sortOrder: SortOrder = (orderParam === 'asc' || orderParam === 1) ? 1 : -1;

  return {
    [String(sortBy)]: sortOrder,
  };
}
