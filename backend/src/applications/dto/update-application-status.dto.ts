import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsEnum(['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected'])
  @IsNotEmpty()
  status: string;
}
