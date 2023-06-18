import { GetChatsResponseDTO, GetMessagesResponseDTO } from '../dtos/response';
import { Chat, ChatMessage, ChatUser, Event, MessageOpenedUser } from '../models';

export async function toGetChatsResponseDTO(body: any, chat: Chat): Promise<GetChatsResponseDTO> {
  const json = JSON.parse(JSON.stringify(chat.toJSON()));

  const chatMessages = await ChatMessage.findAll({
    order: [['created_at', 'DESC']],
    include: {
      model: ChatUser,
      where: {
        chat_id: chat.id,
      },
    },
    limit: 50,
  });

  const chatUserCount = await ChatUser.count({
    where: {
      chat_id: chat.id,
    },
  });
  console.log(chatUserCount);

  const messages = await Promise.all(
    chatMessages.map(async (chatMessage) => {
      const json = JSON.parse(JSON.stringify(chatMessage.toJSON()));

      const messageOpenedUserCount = await MessageOpenedUser.count({
        where: {
          message_id: chatMessage.id,
        },
      });

      const message = new GetMessagesResponseDTO();
      message.id = chatMessage.id;
      message.message = chatMessage.message;
      message.owner = json['ChatUser']['user_id'] == body.user_id;
      message.user_id = json['ChatUser']['user_id'];
      message.opened =
        json['ChatUser']['user_id'] == body.user_id
          ? true
          : (await MessageOpenedUser.findOne({
              where: {
                message_id: chatMessage.id,
                user_id: body.user_id,
              },
            })) != null;
      message.read_all = chatUserCount - 1 == messageOpenedUserCount;
      message.created_at = json['created_at'] as Date;
      return message;
    }),
  );

  const getChatsResponseDTO = new GetChatsResponseDTO();
  getChatsResponseDTO.id = chat.id;
  getChatsResponseDTO.name = chat.name;
  getChatsResponseDTO.messages = messages;
  getChatsResponseDTO.created_at = json['created_at'] as Date;
  return getChatsResponseDTO;
}

/*export async function toGetMessagesResponseDTO(body: any, chatMessage: ChatMessage): Promise<GetMessagesResponseDTO> {
    const json = JSON.parse(JSON.stringify(chatMessage.toJSON()));

    const getMessagesResponseDTO = new GetMessagesResponseDTO();
    getMessagesResponseDTO.id = chatMessage.id;
    getMessagesResponseDTO.message = chatMessage.message;
    getMessagesResponseDTO.opened = (await MessageOpenedUser.findOne({
        where: { message_id: chatMessage.id, user_id: json["ChatUser"]["user_id"] }
    })) != null ? true : json["ChatUser"]["user_id"] == body.user_id;
    getMessagesResponseDTO.created_at = json["created_at"] as Date;
    return getMessagesResponseDTO;
}*/

export async function toWriteMessagesResponseDTO(body: any, chatMessage: ChatMessage): Promise<GetMessagesResponseDTO> {
  const json = JSON.parse(JSON.stringify(chatMessage.toJSON()));

  const chatUserCount = await ChatUser.count({
    where: {
      chat_id: body.chat_id,
    },
  });

  const messageOpenedUserCount = await MessageOpenedUser.count({
    where: {
      message_id: chatMessage.id,
    },
  });

  const getMessagesResponseDTO = new GetMessagesResponseDTO();
  getMessagesResponseDTO.id = chatMessage.id;
  getMessagesResponseDTO.message = chatMessage.message;
  getMessagesResponseDTO.user_id = body.user_id;
  getMessagesResponseDTO.read_all = chatUserCount - 1 == messageOpenedUserCount;
  getMessagesResponseDTO.created_at = json['created_at'] as Date;
  return getMessagesResponseDTO;
}
