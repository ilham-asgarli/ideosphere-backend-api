import { handleErrorAsync, handleErrorAsyncWS } from '../middlewares/errors/async_error_handler.middleware';
import { EventService } from '../services';
import { SuccessResponse } from '../responses';
import { setIntervalAndHandleOnClose } from '../helpers/socket.helper';

export class EventController {
  eventService = new EventService();

  getCloseEvents = handleErrorAsyncWS(async (ws, req) => {
    //const decoded = await getInfoFromRequest(req);

    //const chatsRequestDTO = plainToInstance(ChatsRequestDTO, req.body);
    //chatsRequestDTO.id = decoded.userId;
    //await validateDTO(chatsRequestDTO);

    const send = async () => {
      const data = await this.eventService.getCloseEvents({});
      ws.send(JSON.stringify(new SuccessResponse({ data })));
    };

    setIntervalAndHandleOnClose(ws, send);
  });
}
