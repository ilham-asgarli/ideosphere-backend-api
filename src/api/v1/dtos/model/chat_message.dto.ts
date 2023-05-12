import { IsDefined, IsDate, IsUUID, IsNotEmpty } from "class-validator";

export default class ChatMessageDTO {
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    @IsUUID()
    chat_user_id?: string;

    @IsDefined()
    @IsNotEmpty()
    message?: string;

    @IsDefined()
    @IsDate()
    created_at?: Date;

    @IsDefined()
    @IsDate()
    updated_at?: Date;
}