import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsMongoId, IsBoolean } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsEnum(['draft', 'published'])
  @IsOptional()
  status?: 'draft' | 'published';

  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  employmentType: string;

  @IsEnum(['junior', 'mid', 'senior', 'lead'])
  experienceLevel: string;

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

  @IsString()
  @IsMongoId()
  department: string; 
}
