import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AuthDTO {
    @IsString()
    @IsEmail()
    username: string;

    @IsString()
    password: string;
}