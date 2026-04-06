import {
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsApplicationEmailUnique } from 'src/common/decorators/is-application-email-uniqe.validator';

export class CreatePublicApplicationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  // @IsApplicationEmailUnique({
  //   message: 'You have already applied for this position.',
  // })
  @MinLength(5)
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  linkedInUrl: string;

  @IsOptional()
  @IsString()
  portfolioUrl: string;

  @IsOptional()
  @IsString()
  resumeUrl: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  status?:
    | 'applied'
    | 'in_review'
    | 'interview'
    | 'offer'
    | 'hired'
    | 'rejected';

  @IsOptional()
  @IsString()
  stage?:
    | 'screening'
    | 'technical_interview'
    | 'hr_interview'
    | 'final_interview'
    | 'offer';

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  appliedAt?: string;
}
