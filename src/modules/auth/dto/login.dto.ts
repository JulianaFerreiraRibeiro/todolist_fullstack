import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string
}

