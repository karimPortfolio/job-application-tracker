import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateDepartmentDto {
  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
