import { IsDefined, IsDate, IsUUID, IsLatitude, IsLongitude } from "class-validator";

export default class EventLocationDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsUUID()
    event_id?: string;

    @IsDefined()
    @IsLatitude()
    latitude?: number;

    @IsDefined()
    @IsLongitude()
    longitude?: number;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}