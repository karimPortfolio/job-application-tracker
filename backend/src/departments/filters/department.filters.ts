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

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.createdStart || query.createdEnd) {
    filter.createdAt = {};

    if (query.createdStart) {
      filter.createdAt.$gte = new Date(query.createdStart);
    }

    if (query.createdEnd) {
      filter.createdAt.$lte = new Date(query.createdEnd);
    }
  }

  return filter;
}
