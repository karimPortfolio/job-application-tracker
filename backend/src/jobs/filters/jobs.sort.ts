import { JobQueryDto } from '../dto/job-query.dto';
import type { SortOrder } from 'mongoose';

export function buildJobSort(query: JobQueryDto): Record<string, SortOrder> {
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder: SortOrder = query.sortOrder === 'asc' ? 1 : -1;

  return {
    [sortBy]: sortOrder,
  };
}
