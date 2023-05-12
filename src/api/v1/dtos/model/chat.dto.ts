import { IsDefined, IsDate, IsUUID } from "class-validator";

export default class ChatDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}