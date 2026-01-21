import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;

  @MinLength(8)
  @MaxLength(255)
  @IsString()
  password: string;
}
