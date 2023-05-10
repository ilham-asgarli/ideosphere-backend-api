import { IsDefined, IsEmail, IsDate, Min, IsUUID, IsInt, IsPhoneNumber, Length } from "class-validator";

export default class CompanyDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsUUID()
    user_id?: string;

    name?: string;

    @Length(0, 1000)
    description?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}