import { IsEmail, IsNotEmpty, isString, IsString, MaxLength, MinLength } from 'class-validator'
import { IsUserEmailUnique } from 'src/common/decorators/is-user-email-uniqe.validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  first_name: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  last_name: string

  @IsNotEmpty()
  @IsEmail()
  @IsUserEmailUnique({ message: 'Email already taken' })
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string
}
