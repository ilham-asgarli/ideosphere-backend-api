import { IsDefined, Length, IsUUID, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export default class WriteMessageRequestDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    chat_id?: string;

    @Expose()
    @IsDefined()
    @IsUUID()
    user_id?: string;

    @Expose()
    @IsDefined()
    @IsNotEmpty()
    message?: string;
}