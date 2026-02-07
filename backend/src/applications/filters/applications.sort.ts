import type { SortOrder } from 'mongoose';
import { ApplicationQueryDto } from '../dto/application-query.dto';

export function buildApplicationSort(query: ApplicationQueryDto): Record<string, SortOrder> {
  const allowed: Array<ApplicationQueryDto['sortBy']> = [
    'createdAt',
    'fullName',
    'phoneNumber',
    'appliedAt',
    'rating',
    'aiScore',
  ];

  const sortBy: ApplicationQueryDto['sortBy'] = allowed.includes(query.sortBy as any)
    ? (query.sortBy as ApplicationQueryDto['sortBy'])
    : 'createdAt';

  const orderParam = (query as any).order ?? query.order;
  const sortOrder: SortOrder = (orderParam === 'asc' || orderParam === 1) ? 1 : -1;

  return {
    [String(sortBy)]: sortOrder,
  };
}
