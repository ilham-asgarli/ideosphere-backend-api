import { Op } from 'sequelize';
import { GetChatsResponseDTO, GetMessagesResponseDTO } from '../dtos/response';
import { BadRequestError } from '../errors';
import { toGetChatsResponseDTO, toWriteMessagesResponseDTO } from '../mappers/chat.mapper';
import { Chat, ChatMessage, ChatUser, MessageOpenedUser } from '../models';

export class ChatService {
  async getAll(body: any): Promise<GetChatsResponseDTO[]> {
    const chats = await Chat.findAll({
      order: [['created_at', 'DESC']],
      include: {
        model: ChatUser,
        where: {
          user_id: body.user_id,
        },
      },
    });

    const all: GetChatsResponseDTO[] = await Promise.all(
      chats.map(async (chat) => {
        return await toGetChatsResponseDTO(body, chat);
      }),
    );

    return all;
  }

  async writeMessage(body: any): Promise<{ chat_id: string; message: GetMessagesResponseDTO }> {
    const chatUser = await ChatUser.findOne({
      where: {
        chat_id: body.chat_id,
        user_id: body.user_id,
      },
    });

    if (!chatUser) throw new BadRequestError('Invalid chat or user.');

    const chatMessage = await ChatMessage.create({
      chat_user_id: chatUser.id,
      message: body.message!,
    });
    return { chat_id: body.chat_id!, message: await toWriteMessagesResponseDTO(body, chatMessage) };
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

  async readMessages(body: any) {
    const messageOpenedUsers = await Promise.all(
      body.messages!.map(async (e: string) => {
        var chatMessage = await ChatMessage.findOne({
          include: {
            model: ChatUser,
            where: {
              user_id: {
                [Op.not]: body.user_id,
              },
            },
          },
          where: {
            id: e,
          },
        });

        return chatMessage
          ? await MessageOpenedUser.findOrCreate({
              where: {
                message_id: e,
                user_id: body.user_id,
              },
            })
          : null;
      }),
    );
  }
}
