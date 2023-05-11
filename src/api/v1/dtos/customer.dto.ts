import { IsDefined, IsDate, Min, IsUUID, IsInt, Length } from "class-validator";

export default class CustomerDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsUUID()
    user_id?: string;

    @IsDefined()
    @Min(1)
    @IsInt()
    gender_id?: number;

    firstname?: string;

    lastname?: string;

    @Length(0, 300)
    biography?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}