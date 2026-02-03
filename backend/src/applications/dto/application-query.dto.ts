import { IsDateString, IsIn, IsOptional, IsString } from "class-validator";
import { Job } from "src/jobs/jobs.schema";

export class ApplicationQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['fullName', 'createdAt', 'phoneNumber', 'appliedAt', 'rating', 'AiScore'])
  sortBy?: 'fullName' | 'createdAt' | 'phoneNumber' | 'appliedAt' | 'rating' | 'AiScore';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  job?: string | Job;

  @IsOptional()
  @IsString()
  @IsIn(['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected'])
  status?: string;

  @IsOptional()
  @IsString()
  @IsIn(['screening', 'technical_interview', 'hr_interview', 'final_interview', 'offer'])
  stage?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsDateString()
  appliedAtStart?: string;

  @IsOptional()
  @IsDateString()
  appliedAtEnd?: string;
}
