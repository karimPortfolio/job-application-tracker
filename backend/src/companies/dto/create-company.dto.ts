import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  industry: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsUrl({}, { message: 'websiteUrl must be a valid URL' })
  websiteUrl: string;
}
