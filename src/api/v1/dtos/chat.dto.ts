import { IsDefined, IsDate, IsUUID } from "class-validator";

class ChatDTO {
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