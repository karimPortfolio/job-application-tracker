import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class JobQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsEnum(['draft', 'published', 'closed', 'archived'])
  status?: string;

  @IsOptional()
  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  employmentType?: string;

  @IsOptional()
  @IsEnum(['junior', 'mid', 'senior', 'lead'])
  experienceLevel?: string;

  @IsOptional()
  isRemote?: boolean;

  @IsOptional()
  createdAtStart?: string;

  @IsOptional()
  createdAtEnd?: string;

  @IsOptional()
  @IsEnum(['createdAt', 'title', 'applicationsCount', 'viewsCount'])
  sortBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
