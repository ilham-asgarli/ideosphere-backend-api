import { Op } from 'sequelize';
import { GetChatsResponseDTO } from '../dtos/response';
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

  async onOpenMessages(body: any, sendToChat: (eventName: string, chat_id: string, callback: (chat: ChatUser) => any) => any) {
    await this.readMessages(body);

    const chatUserCount = await ChatUser.count({
      where: {
        chat_id: body.chat_id,
      },
    });

    var messages: any[] = [];

    await Promise.all(
      body.messages!.map(async (id: string) => {
        const messageOpenedUserCount = await MessageOpenedUser.count({
          where: {
            message_id: id,
          },
        });

        messages.push({ id, read_all: chatUserCount - 1 == messageOpenedUserCount });
      }),
    );

    sendToChat('opened-messages', body.chat_id!, async (chat: ChatUser) => {
      return { chat_id: body.chat_id, messages: messages };
    });
  }

  async writeMessage(body: any) {
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
  }

  async onNewMessage(sendToChat: (eventName: string, chat_id: string, callback: (chat: ChatUser) => any) => any) {
    ChatMessage.afterCreate('newMessage', async (instance, options) => {
      const chatUser = await ChatUser.findByPk(instance.chat_user_id);

      if (chatUser == null)
        return

      sendToChat('new-message', chatUser.chat_id!, async (chat: ChatUser) => {
        let data = { chat_id: chatUser.chat_id!, message: await toWriteMessagesResponseDTO(chatUser, instance) }

        data.message.opened =
          chatUser.user_id == chat.user_id
            ? true
            : (await MessageOpenedUser.findOne({
              where: {
                message_id: data.message.id,
                user_id: chat.user_id,
              },
            })) != null;
        data.message.owner = chatUser.user_id == chat.user_id;
        return data;
      });
    });
  }

  async readMessages(body: any) {
    const messageOpenedUsers = await Promise.all(
      body.messages!.map(async (e: string) => {
        var chatMessage = await ChatMessage.findByPk(e,
          {
            include: {
              model: ChatUser,
              where: {
                user_id: {
                  [Op.not]: body.user_id,
                },
              },
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
