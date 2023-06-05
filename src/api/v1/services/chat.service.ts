import { Op } from "sequelize";
import { ChatsRequestDTO, GetMessagesRequestDTO, ReadMessageRequestDTO, WriteMessageRequestDTO } from "../dtos/request";
import { GetChatsResponseDTO, GetMessagesResponseDTO } from "../dtos/response";
import { BadRequestError } from "../errors";
import { toGetChatsResponseDTO, toWriteMessagesResponseDTO } from "../mappers/chat.mapper";
import { Chat, ChatMessage, ChatUser, MessageOpenedUser } from "../models";

export class ChatService {
    async getAll(chatsRequestDTO: ChatsRequestDTO): Promise<GetChatsResponseDTO[]> {
        const chats = await Chat.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: ChatUser,
                where: {
                    user_id: chatsRequestDTO.user_id,
                },
            },
        });

        const all: GetChatsResponseDTO[] = await Promise.all(
            chats.map(async (chat) => {
                return await toGetChatsResponseDTO(chatsRequestDTO, chat);
            })
        );

        return all;
    }

    async writeMessage(writeMessageRequestDTO: WriteMessageRequestDTO): Promise<{ chat_id: string, message: GetMessagesResponseDTO }> {
        const chatUser = await ChatUser.findOne({
            where: {
                chat_id: writeMessageRequestDTO.chat_id,
                user_id: writeMessageRequestDTO.user_id,
            }
        });

        if (!chatUser)
            throw new BadRequestError('Invalid chat or user.');

        const chatMessage = await ChatMessage.create({
            chat_user_id: chatUser.id,
            message: writeMessageRequestDTO.message!
        });
        return { chat_id: writeMessageRequestDTO.chat_id!, message: await toWriteMessagesResponseDTO(writeMessageRequestDTO, chatMessage) };
    }

    /*async getMessages(getMessagesRequestDTO: GetMessagesRequestDTO): Promise<any> {
        const chatMessages = await ChatMessage.findAll({
            order: [['created_at', 'DESC']],
            include: {
                model: ChatUser,
                where: {
                    chat_id: getMessagesRequestDTO.chat_id,
                },
            },
        });

        const messages: GetMessagesResponseDTO[] = await Promise.all(chatMessages.map(async (chatMessage) => {
            return await toGetMessagesResponseDTO(getMessagesRequestDTO, chatMessage);
        }));

        return { chat_id: getMessagesRequestDTO.chat_id, messages };
    }*/


    async readMessages(readMessageRequestDTO: ReadMessageRequestDTO) {
        const messageOpenedUsers = await Promise.all(
            readMessageRequestDTO.messages!.map(async (e) => {
                var chatMessage = await ChatMessage.findOne({
                    include: {
                        model: ChatUser,
                        where: {
                            user_id: {
                                [Op.not]: readMessageRequestDTO.user_id,
                            }
                        }
                    },
                    where: {
                        id: e,
                    }
                });

                return chatMessage ? await MessageOpenedUser.findOrCreate({
                    where: {
                        message_id: e,
                        user_id: readMessageRequestDTO.user_id,
                    }
                }) : null;
            }),
        );
    }
}