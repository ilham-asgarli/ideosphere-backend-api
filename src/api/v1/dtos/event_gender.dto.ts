import { IsDefined, IsDate, IsInt, Min } from "class-validator";

class EventGenderDTO {
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