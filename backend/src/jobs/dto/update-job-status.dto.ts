import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateJobStatusDto {
  @IsEnum(['draft', 'published', 'closed', 'archived'])
  @IsNotEmpty()
  status: string;
}