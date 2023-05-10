import { IsDefined, IsEmail, IsInt, Min, IsPhoneNumber, Length } from "class-validator";

export default class RegisterRequestDTO {
    @Min(0)
    @IsInt()
    user_type_id?: number;

    @IsDefined()
    @IsEmail()
    email?: string;

    @IsDefined()
    @Length(6)
    password?: string;

    @IsPhoneNumber()
    phone_number?: string;
}