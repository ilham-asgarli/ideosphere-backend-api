import { plainToInstance } from "class-transformer";
import { handleErrorAsync, handleErrorAsyncWS } from "../middlewares/errors/async_error_handler.middleware";
import { ChatService } from "../services";
import { validateDTO } from "../helpers/validation.helper";
import { SuccessResponse } from "../responses";
import { ChatsRequestDTO, GetMessagesRequestDTO, WriteMessageRequestDTO } from '../dtos/request';
import { getInfoFromRequest } from '../helpers/jwt.helper';
import { setIntervalAndHandleOnClose } from '../helpers/socket.helper';

export class ChatController {
    chatService = new ChatService();

    getAll = handleErrorAsyncWS(async (ws, req) => {
        const decoded = await getInfoFromRequest(req);

        const chatsRequestDTO = plainToInstance(ChatsRequestDTO, req.body);
        chatsRequestDTO.id = decoded.userId;
        await validateDTO(chatsRequestDTO);

        const send = async () => {
            const data = await this.chatService.getAll(chatsRequestDTO);
            ws.send(JSON.stringify(new SuccessResponse({ data })));
        };

        setIntervalAndHandleOnClose(ws, send);
    });

    writeMessage = handleErrorAsync(async (req, res) => {
        const decoded = await getInfoFromRequest(req);

        const writeMessageRequestDTO = plainToInstance(WriteMessageRequestDTO, req.body);
        writeMessageRequestDTO.user_id = decoded.userId;
        await validateDTO(writeMessageRequestDTO);

        const data = await this.chatService.writeMessage(writeMessageRequestDTO);
        res.status(200).json(new SuccessResponse({ data }));
    });

    getMessages = handleErrorAsyncWS(async (ws, req) => {
        const decoded = await getInfoFromRequest(req);

        const getMessagesRequestDTO = new GetMessagesRequestDTO();
        getMessagesRequestDTO.user_id = decoded.userId;
        getMessagesRequestDTO.chat_id = req.params.chat_id;
        await validateDTO(getMessagesRequestDTO);


        const send = async () => {
            const data = await this.chatService.getMessages(getMessagesRequestDTO);
            ws.send(JSON.stringify(new SuccessResponse({ data })));
        };

        setIntervalAndHandleOnClose(ws, send);
    });
}