import { Expose } from "class-transformer";
import { IsDefined, IsDate, IsUUID, IsNotEmpty } from "class-validator";

export default class ChatMessageDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    id?: string;

    @Expose()
    @IsDefined()
    @IsUUID()
    chat_user_id?: string;

    @Expose()
    @IsDefined()
    @IsNotEmpty()
    message?: string;

    @Expose()
    @IsDefined()
    @IsDate()
    created_at?: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updated_at?: Date;
}