import { Expose, Transform } from 'class-transformer';
import { capitalize } from '../../common/utils/capitalize';

export class JobResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => capitalize(value))
  country: string;

  @Expose()
  @Transform(({ value }) => capitalize(value))
  city?: string;

  @Expose()
  status: string;

  @Expose()
  @Transform(({ value }) => capitalize(value))
  employmentType: string;

  @Expose()
  @Transform(({ value }) => capitalize(value))
  experienceLevel: string;

  @Expose()
  isRemote: boolean;

  @Expose()
  salaryMin?: number;

  @Expose()
  salaryMax?: number;

  @Expose()
  applicationsCount: number;

  @Expose()
  viewsCount: number;

  @Expose()
  user: {
    _id: string;
    name: string;
  } | null;

  @Expose()
  department: {
    _id: string;
    title: string;
  } | null;

  @Expose()
  createdAt: Date;

  @Expose()
  createdAtDiff: string;
}
