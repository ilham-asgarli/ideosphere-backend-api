import { ChatDTO, ChatMessageDTO } from "../dtos/model";
import { ChatUsersRequestDTO, GetMessagesRequestDTO, WriteMessageRequestDTO } from "../dtos/request";
import { ChatUsersResponseDTO, GetMessagesResponseDTO } from "../dtos/response";
import { BadRequestError } from "../errors";
import { convertDTOtoModelJSON, convertModeltoDTOJSON } from "../helpers/dto_model_convert.helper";
import { Chat, ChatMessage, ChatUser } from "../models";

export class ChatService {
    async getUsers(chatUsersRequestDTO: ChatUsersRequestDTO): Promise<ChatUsersResponseDTO> {
        const chats = await Chat.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: ChatUser,
                where: {
                    user_id: chatUsersRequestDTO.id,
                },
            },
        });

        const chatUsersResponseDTO = new ChatUsersResponseDTO();

        chatUsersResponseDTO.chats = chats.map(function (chat) {
            return convertModeltoDTOJSON(ChatDTO, chat);
        });


        return chatUsersResponseDTO;
    }

    async writeMessage(writeMessageRequestDTO: WriteMessageRequestDTO): Promise<void> {
        const chatUser = await ChatUser.findOne({ where: { chat_id: writeMessageRequestDTO.chat_id, user_id: writeMessageRequestDTO.user_id } });

        if (!chatUser)
            throw new BadRequestError('Invalid chat or user.');

        const chatMessage = await ChatMessage.create({ chat_user_id: chatUser.id, message: writeMessageRequestDTO.message! });
    }

    async getMessages(getMessagesRequestDTO: GetMessagesRequestDTO): Promise<GetMessagesResponseDTO> {
        const chatMessages = await ChatMessage.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: ChatUser,
                where: {
                    chat_id: getMessagesRequestDTO.chat_id,
                },
            },
        });

        const getMessagesResponseDTO = new GetMessagesResponseDTO();

        getMessagesResponseDTO.chat_messages = chatMessages.map(function (chatMessage) {
            return convertModeltoDTOJSON(ChatMessageDTO, chatMessage);
        });

        return getMessagesResponseDTO;
    }
}