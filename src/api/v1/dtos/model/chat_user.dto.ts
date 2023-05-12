import { IsDefined, IsDate, IsUUID, IsNotEmpty } from "class-validator";

export default class ChatUserDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsUUID()
    user_id?: string;

    @IsDefined()
    @IsUUID()
    chat_id?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}