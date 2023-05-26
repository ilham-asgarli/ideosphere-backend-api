import { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import { handleErrorAsync } from "../middlewares/errors/async_error_handler.middleware";
import { ChatService } from "../services";
import { validateDTO } from "../helpers/validation.helper";
import { SuccessResponse } from "../responses";
import { ChatsRequestDTO, GetMessagesRequestDTO, WriteMessageRequestDTO } from '../dtos/request';
import { getInfoFromRequest } from '../helpers/jwt.helper';

export class ChatController {
    chatService = new ChatService();

    getAll = handleErrorAsync(async (req: Request, res: Response) => {
        const decoded = await getInfoFromRequest(req);

        const chatsRequestDTO = plainToInstance(ChatsRequestDTO, req.body);
        chatsRequestDTO.id = decoded.userId;
        await validateDTO(chatsRequestDTO);

        const data = await this.chatService.getAll(chatsRequestDTO);
        res.status(200).json(new SuccessResponse({ data }));
    });

    writeMessage = handleErrorAsync(async (req: Request, res: Response) => {
        const decoded = await getInfoFromRequest(req);

        const writeMessageRequestDTO = plainToInstance(WriteMessageRequestDTO, req.body);
        writeMessageRequestDTO.user_id = decoded.userId;
        await validateDTO(writeMessageRequestDTO);

        const data = await this.chatService.writeMessage(writeMessageRequestDTO);
        res.status(200).json(new SuccessResponse({ data }));
    });

    getMessages = handleErrorAsync(async (req: Request, res: Response) => {
        const decoded = await getInfoFromRequest(req);

        const getMessagesRequestDTO = plainToInstance(GetMessagesRequestDTO, req.body);
        getMessagesRequestDTO.user_id = decoded.userId;
        await validateDTO(getMessagesRequestDTO);

        const data = await this.chatService.getMessages(getMessagesRequestDTO);
        res.status(200).json(new SuccessResponse({ data }));
    });
}