import { handleErrorAsync, handleErrorAsyncWS } from '../middlewares/errors/async_error_handler.middleware';
import { ChatService, EventService } from '../services';
import { getInfoFromRequest } from '../helpers/jwt.helper';
import SocketResponse from '../responses/socket.response';
import ws from 'ws';
import { ChatUser } from '../models';
import { ChatValidator, EventValidator } from '../validators';

export class SocketController {
  chatValidator = new ChatValidator();
  eventValidator = new EventValidator();

  chatService = new ChatService();
  eventService = new EventService();

  clients: Map<string, ws> = new Map();
  pingInterval = 15000;

  constructor() {
    setInterval(this.sendPingMessages, this.pingInterval);

    this.chatService.onNewMessage(this.sendToChat);
  }

  sendPingMessages = () => {
    for (const [id, client] of this.clients.entries()) {
      if (client.readyState === client.OPEN) {
        client.ping();
      } else {
        this.clients.delete(id);
      }
    }
  };

  getMessages = handleErrorAsyncWS(async (ws, req) => {
    const decoded = await getInfoFromRequest(req);
    //const wss = (req as any).getWss('v1/socket') as ws.Server;

    req.body.user_id = decoded.userId;
    this.chatValidator.getMessages(req.body);

    this.clients.set(req.body.user_id!, ws);

    this.onStart(ws, req);

    ws.onmessage = async (event) => {
      const eventData = JSON.parse(event.data.toString());
      const body = eventData.body;

      try {
        switch (eventData.name) {
          case 'close-events':
            await this.onGetCloseEvents(ws, body);
            break;
          case 'new-message':
            body.user_id = decoded.userId;
            await this.onNewMessage(body);
            break;
          case 'open-messages':
            body.user_id = decoded.userId;
            await this.onOpenMessages(body);
            break;
          case 'create-event':
            body.organizer_id = decoded.userId;
            await this.onCreateEvent(ws, body);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    };

    ws.onclose = () => {
      this.clients.delete(req.body.user_id!);
    };
  });

  onStart = async (ws: ws, req: any) => {
    const chats = await this.chatService.getAll(req.body);
    ws.send(JSON.stringify(new SocketResponse({ name: 'start', data: { chats } })));
  }

  onGetCloseEvents = async (ws: ws, body: any) => {
    const events = await this.eventService.getCloseEvents(body);
    ws.send(JSON.stringify(new SocketResponse({ name: 'close-events', data: events })));
  }

  onOpenMessages = async (body: any) => {
    this.chatValidator.onOpenMessages(body);
    this.chatService.onOpenMessages(body, this.sendToChat);
  };

  onNewMessage = async (body: any) => {
    this.chatValidator.onNewMessage(body);
    let data = await this.chatService.writeMessage(body);
  };

  onCreateEvent = async (ws: ws, body: any) => {
    try {
      this.eventValidator.onCreateEvent(body);
      let data = await this.eventService.createEvent(body);
    } catch (e: any) {
      ws.send(JSON.stringify(new SocketResponse({ name: 'create-event-fail', data: e.data })));
    }
  };

  sendToChat = async (eventName: string, chat_id: string, callback: (chat: ChatUser) => any) => {
    const chats = await ChatUser.findAll({
      where: {
        chat_id: chat_id,
      },
    });

    chats.forEach(async (chat) => {
      let data = await callback(chat);
      this.clients.get(chat.user_id)?.send(JSON.stringify(new SocketResponse({ name: eventName, data })));
    });
  };
}
