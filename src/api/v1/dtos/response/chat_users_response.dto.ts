import { Expose, Type } from "class-transformer";
import { IsDefined, IsEmail, IsUUID, Length, ValidateNested } from "class-validator";
import { ChatDTO } from "../model";

export default class ChatUsersResponseDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    id?: string;

    @Expose()
    @IsDefined()
    @ValidateNested()
    //@Type(() => ChatDTO)
    chats?: ChatDTO[];
}