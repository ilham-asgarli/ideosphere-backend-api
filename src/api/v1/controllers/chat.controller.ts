import { handleErrorAsyncWS } from "../middlewares/errors/async_error_handler.middleware";
import { ChatService } from "../services";
import { validateDTO } from "../helpers/validation.helper";
import { ChatsRequestDTO, GetMessagesRequestDTO, ReadMessageRequestDTO, WriteMessageRequestDTO } from '../dtos/request';
import { getInfoFromRequest } from '../helpers/jwt.helper';
import SocketResponse from "../responses/socket.response";
import ws from "ws";
import { ChatUser, MessageOpenedUser } from "../models";

export class ChatController {
    chatService = new ChatService();
    clients: Map<string, ws> = new Map();
    pingInterval = 15000;

    getMessages = handleErrorAsyncWS(async (ws, req) => {
        const decoded = await getInfoFromRequest(req);
        //const wss = (req as any).getWss('v1/chat') as ws.Server;

        const chatsRequestDTO = new ChatsRequestDTO();

        chatsRequestDTO.user_id = decoded.userId;
        await validateDTO(chatsRequestDTO);

        const data = await this.chatService.getAll(chatsRequestDTO);
        ws.send(JSON.stringify(new SocketResponse({ name: "start", data })));

        const sendPingMessages = () => {
            for (const [id, client] of this.clients.entries()) {
                if (client.readyState === client.OPEN) {
                    client.ping();
                } else {
                    this.clients.delete(id);
                }   
            }
        }

        this.clients.set(chatsRequestDTO.user_id!, ws);
        setInterval(sendPingMessages, this.pingInterval);

        ws.onmessage = async (event) => {
            console.log(event);
            const eventData = JSON.parse(event.data.toString());

            switch (eventData.name) {
                case "chat":
                    onChat(eventData);
                    break;
                case "add-contact":
                    break;
                case "new-message":
                    await onNewMessage(eventData);
                    break;
                case "open-messages":
                    onOpenMessages(eventData);
                    break;
            }
        };

        ws.onclose = () => {
            this.clients.delete(chatsRequestDTO.user_id!);
        }

        const onChat = async (eventData: any) => {
            try {
                /*const getMessagesRequestDTO = new GetMessagesRequestDTO();
                getMessagesRequestDTO.user_id = decoded.userId;
                getMessagesRequestDTO.chat_id = eventData.body;
                await validateDTO(getMessagesRequestDTO);
                data = await this.chatService.getMessages(getMessagesRequestDTO);
                ws.send(JSON.stringify(new SocketResponse({ name: "messages", data })));*/
            } catch (e) {

            }
        }

        const onOpenMessages = async (eventData: any) => {
            const readMessageRequestDTO = new ReadMessageRequestDTO();
            readMessageRequestDTO.user_id = decoded.userId;
            readMessageRequestDTO.messages = eventData.body.messages;
            readMessageRequestDTO.chat_id = eventData.body.chat_id;
            await validateDTO(readMessageRequestDTO);
            await this.chatService.readMessages(readMessageRequestDTO);

            const chatUserCount = await ChatUser.count({
                where: {
                    chat_id: readMessageRequestDTO.chat_id,
                }
            });

            var messages: any[] = [];

            await Promise.all(
                readMessageRequestDTO.messages!.map(async (id) => {
                    const messageOpenedUserCount = await MessageOpenedUser.count({
                        where: {

                            message_id: id,
                        }
                    })

                    messages.push({ id, read_all: (chatUserCount - 1) == messageOpenedUserCount });
                }),
            );

            sendToChat("opened-messages", readMessageRequestDTO.chat_id!, async (chat: ChatUser) => {
                return { chat_id: readMessageRequestDTO.chat_id, messages: messages };
            });
        }

        const onNewMessage = async (eventData: any) => {
            try {
                const writeMessageRequestDTO = new WriteMessageRequestDTO();
                writeMessageRequestDTO.user_id = decoded.userId;
                writeMessageRequestDTO.chat_id = eventData.body.chat_id;
                writeMessageRequestDTO.message = eventData.body.message;
                await validateDTO(writeMessageRequestDTO);
                let data = await this.chatService.writeMessage(writeMessageRequestDTO);

                sendToChat("new-message", writeMessageRequestDTO.chat_id!, async (chat: ChatUser) => {
                    data.message.opened = writeMessageRequestDTO.user_id == chat.user_id ? true : (await MessageOpenedUser.findOne({
                        where: {
                            message_id: data.message.id,
                            user_id: chat.user_id
                        }
                    })) != null;
                    data.message.owner = writeMessageRequestDTO.user_id == chat.user_id;
                    return data;
                });
                /*wss.clients.forEach(element => {
                    element.send(JSON.stringify(new SocketResponse({ name: "new-message", data })));
                });*/
                //ws.send(JSON.stringify(new SocketResponse({ name: "new-message", data })));
            } catch (e) {

            }
        }

        const sendToChat = async (eventName: string, chat_id: string, callback: (chat: ChatUser) => any) => {
            const chats = await ChatUser.findAll({
                where: {
                    chat_id: chat_id,
                }
            });

            chats.forEach(async (chat) => {
                let data = await callback(chat);
                this.clients.get(chat.user_id)?.send(JSON.stringify(new SocketResponse({ name: eventName, data })));
            });
        }
    });
}