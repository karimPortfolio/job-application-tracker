import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsEnum(['draft', 'published'])
  @IsOptional()
  status?: 'draft' | 'published';

  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  @IsOptional()
  employmentType?: string;

  @IsEnum(['junior', 'mid', 'senior', 'lead'])
  @IsOptional()
  experienceLevel?: string;

  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryMax?: number;

  @IsOptional()
  @IsString()
  @IsMongoId()
  department?: string;
}
