import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateApplicationStageDto {
  @IsEnum([
    'screening',
    'technical_interview',
    'hr_interview',
    'final_interview',
    'offer',
  ])
  @IsNotEmpty()
  stage: string;
}
