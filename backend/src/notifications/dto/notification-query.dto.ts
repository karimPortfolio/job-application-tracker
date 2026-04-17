import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class NotificationQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
