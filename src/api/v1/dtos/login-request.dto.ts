import { IsDefined, IsEmail, Length } from "class-validator";

export default class LoginRequestDTO {
    @IsDefined()
    @IsEmail()
    email?: string;

    @IsDefined()
    @Length(6)
    password?: string;
}