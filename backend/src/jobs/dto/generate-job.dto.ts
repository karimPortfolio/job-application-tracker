import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GenerateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  department: string;
  @IsString()
  @IsOptional()
  seniority?: string;
  @IsString()
  @IsOptional()
  employmentType?: string;
  @IsString()
  @IsOptional()
  location?: string;
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];
}
