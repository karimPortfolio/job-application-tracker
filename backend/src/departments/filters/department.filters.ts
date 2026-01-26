import { Type } from '@nestjs/common';
import { DepartmentQueryDto } from '../dto/department-query.dto';
import { Types } from 'mongoose';
import { json } from 'stream/consumers';

export function buildDepartmentFilter(
  company: string,
  query: DepartmentQueryDto,
) {
  const filter: any = {
    company: company,
  };

  if (query.title) {
    filter.title = query.title;
    return filter;
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.createdFrom || query.createdTo) {
    filter.createdAt = {};

    if (query.createdFrom) {
      filter.createdAt.$gte = new Date(query.createdFrom);
    }

    if (query.createdTo) {
      filter.createdAt.$lte = new Date(query.createdTo);
    }
  }

  return filter;
}
