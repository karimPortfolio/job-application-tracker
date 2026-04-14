import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { Match } from "../../common/decorators/match.decorator"

export class PasswordUpdateDto {
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 0
    })
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @Match('newPassword', { message: 'Passwords do not match' })
    newPasswordConfirm: string;
}
