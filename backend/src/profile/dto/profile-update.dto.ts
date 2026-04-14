import { IsEmail, IsOptional, IsString } from "class-validator";


export class ProfileUpdateDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;
}
