import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  @MinLength(5)
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  linkedInUrl?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsString()
  status?: 'applied' | 'in_review' | 'interview' | 'offer' | 'hired' | 'rejected';

  @IsOptional()
  @IsString()
  stage?: 'screening' | 'technical_interview' | 'hr_interview' | 'final_interview' | 'offer';

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  referalName?: string;

  @IsOptional()
  @IsString()
  referalEmail?: string;
}
