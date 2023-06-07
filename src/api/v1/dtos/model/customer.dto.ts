import { Expose } from "class-transformer";
import { IsDefined, IsDate, Min, IsUUID, IsInt, Length } from "class-validator";

export default class CustomerDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    id?: string;

    @Expose()
    @IsDefined()
    @IsUUID()
    user_id?: string;

    @Expose()
    @IsDefined()
    @Min(1)
    @IsInt()
    gender_id?: number;

    @Expose()
    firstname?: string;

    @Expose()
    lastname?: string;

    @Expose()
    @Length(0, 300)
    biography?: string;

    @Expose()
    @IsDefined()
    @IsDate()
    created_at?: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updated_at?: Date;
}