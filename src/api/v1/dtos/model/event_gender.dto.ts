import { IsDefined, IsDate, IsInt, Min } from "class-validator";

export default class EventGenderDTO {
    @IsDefined()
    @Min(1)
    @IsInt()
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