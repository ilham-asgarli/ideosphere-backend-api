import { IsDefined, IsDate, IsInt, Min } from "class-validator";

export default class UserTypeDTO {
    @IsDefined()
    @IsInt()
    @Min(0)
    id?: number;

    @IsDefined()
    name?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}