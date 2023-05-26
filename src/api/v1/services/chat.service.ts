import { ChatDTO, ChatMessageDTO } from "../dtos/model";
import { ChatsRequestDTO, GetMessagesRequestDTO, WriteMessageRequestDTO } from "../dtos/request";
import { BadRequestError } from "../errors";
import { convertDTOtoModelJSON, convertModeltoDTOJSON } from "../helpers/dto_model_convert.helper";
import { Chat, ChatMessage, ChatUser } from "../models";

export class ChatService {
    async getAll(chatsRequestDTO: ChatsRequestDTO): Promise<ChatDTO[]> {
        const chats = await Chat.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: ChatUser,
                where: {
                    user_id: chatsRequestDTO.id,
                },
            },
        });

        const all: ChatDTO[] = chats.map(function (chat) {
            return convertModeltoDTOJSON(ChatDTO, chat);
        });

        return all;
    }

    async writeMessage(writeMessageRequestDTO: WriteMessageRequestDTO): Promise<void> {
        const chatUser = await ChatUser.findOne({ where: { chat_id: writeMessageRequestDTO.chat_id, user_id: writeMessageRequestDTO.user_id } });

        if (!chatUser)
            throw new BadRequestError('Invalid chat or user.');

        const chatMessage = await ChatMessage.create({ chat_user_id: chatUser.id, message: writeMessageRequestDTO.message! });
    }

    async getMessages(getMessagesRequestDTO: GetMessagesRequestDTO): Promise<ChatMessageDTO[]> {
        const chatMessages = await ChatMessage.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: ChatUser,
                where: {
                    chat_id: getMessagesRequestDTO.chat_id,
                },
            },
        });

        const messages: ChatMessageDTO[] = chatMessages.map(function (chatMessage) {
            return convertModeltoDTOJSON(ChatMessageDTO, chatMessage);
        });

        return messages;
    }
}