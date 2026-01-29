import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class UpdateCompanyDto {
  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ValidateIf((o, v) => v !== undefined) //====only skip if the key is MISSING
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString()
  @MaxLength(255)
  industry: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, {
    message: 'websiteUrl must be a valid URL (e.g., https://example.com)',
  })
  websiteUrl: string;
}
