import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsUUID, Length } from "class-validator";

export default class ChatsRequestDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    user_id?: string;
}