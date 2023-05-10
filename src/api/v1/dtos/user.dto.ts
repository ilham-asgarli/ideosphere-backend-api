import { IsDefined, IsEmail, IsDate, Min, IsUUID, IsInt, IsPhoneNumber, Length } from "class-validator";

class UserDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsInt()
    @Min(0)
    user_type_id?: string;

    @IsDefined()
    @IsEmail()
    email?: string;

    @IsDefined()
    @Length(6)
    password?: string;

    @IsPhoneNumber()
    phone_number?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}