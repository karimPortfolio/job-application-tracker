import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class UpdatePreferencesDto {
  @ValidateIf((o, v) => v !== undefined)
  @IsNotEmpty({ message: 'Theme cannot be empty' })
  @IsEnum(['light', 'dark', 'system'])
  @MaxLength(255)
  theme: 'light' | 'dark' | 'system';
}
