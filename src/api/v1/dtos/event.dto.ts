import { IsDefined, IsDate, IsUUID, IsInt, Min, Length } from "class-validator";

export default class EventDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @Min(0)
    @IsInt()
    gender_id?: number;

    @IsDefined()
    @IsUUID()
    organizer_id?: string;

    @IsDefined()
    @IsUUID()
    chat_id?: string;

    name?: string;

    @Length(0, 3000)
    description?: string;

    address?: string;

    @IsDate()
    start_time?: Date;

    @IsDate()
    end_time?: Date;

    @Min(0)
    @IsInt()
    max_age?: number;

    @IsInt()
    @Min(0)
    min_age?: number;

    @Min(0)
    entry_fee?: number;

    @Min(1)
    participant_capacity?: number;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}