import { IsBoolean, IsOptional, IsString, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NotificationPreferencesDto {
  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @IsBoolean()
  @IsOptional()
  push?: boolean;

  @IsBoolean()
  @IsOptional()
  marketing?: boolean;
}

export class UpdatePreferencesDto {
  @IsString()
  @IsOptional()
  @IsIn(['light', 'dark', 'system'])
  theme?: 'light' | 'dark' | 'system';

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationPreferencesDto)
  notifications?: NotificationPreferencesDto;
}