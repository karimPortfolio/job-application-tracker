import { IsOptional, IsString, Max, MaxLength } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
