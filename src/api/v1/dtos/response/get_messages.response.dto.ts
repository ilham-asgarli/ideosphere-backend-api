import { IsDefined, Length, IsUUID, IsNotEmpty, ValidateNested } from "class-validator";
import { Expose } from "class-transformer";
import { ChatMessageDTO } from "../model";

export default class GetMessagesResponseDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    id?: string;

    @Expose()
    @IsDefined()
    @ValidateNested()
    //@Type(() => ChatDTO)
    chat_messages?: ChatMessageDTO[];
}