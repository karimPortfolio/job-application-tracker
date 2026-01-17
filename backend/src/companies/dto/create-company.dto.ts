import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
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
