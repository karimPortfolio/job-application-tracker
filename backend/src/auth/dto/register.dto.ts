import { IsEmail, IsNotEmpty, isString, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string
}
