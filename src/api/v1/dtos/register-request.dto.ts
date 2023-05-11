import { IsDefined, IsEmail, IsInt, Min, IsPhoneNumber, Length } from "class-validator";
import { Expose } from "class-transformer";

export default class RegisterRequestDTO {
    @Expose()
    @IsDefined()
    @Min(1)
    @IsInt()
    user_type_id?: number;

    @Expose()
    @IsDefined()
    @IsEmail()
    email?: string;

    @Expose()
    @IsDefined()
    @Length(6)
    password?: string;

    @Expose()
    @IsPhoneNumber()
    phone_number?: string;
}