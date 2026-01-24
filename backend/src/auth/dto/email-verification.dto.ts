import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class EmailVerificationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}