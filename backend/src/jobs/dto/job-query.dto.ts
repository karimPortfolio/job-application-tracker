import { IsEnum, IsOptional, IsString, IsNumberString } from 'class-validator';

export class JobQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

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
  createdFrom?: string;

  @IsOptional()
  createdTo?: string;

  @IsOptional()
  @IsEnum(['createdAt', 'title', 'applicationsCount', 'viewsCount'])
  sortBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
