import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsMongoId,
  IsBoolean,
  ValidateIf,
} from 'class-validator';

export class UpdateJobDto {
  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString()
  title?: string;

  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsString()
  @IsOptional()
  description?: string;

  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Country cannot be empty' })
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsEnum(['draft', 'published'])
  @IsOptional()
  status?: 'draft' | 'published';

  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Employment type cannot be empty' })
  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  @IsOptional()
  employmentType?: string;

  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Experience level cannot be empty' })
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

  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Department cannot be empty' })
  @IsString()
  @IsMongoId()
  department?: string;
}
