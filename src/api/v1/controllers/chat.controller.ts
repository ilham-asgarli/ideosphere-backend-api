import { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import { handleErrorAsync } from "../middlewares/errors/async_error_handler.middleware";
import { ChatService } from "../services";
import { validateDTO } from "../helpers/validation.helper";
import { SuccessResponse } from "../responses";
import { ChatUsersRequestDTO, GetMessagesRequestDTO, WriteMessageRequestDTO } from '../dtos/request';
import { getInfoFromRequest } from '../helpers/jwt.helper';

export class ChatController {
    chatService = new ChatService();

    getUsers = handleErrorAsync(async (req: Request, res: Response) => {
        const decoded = await getInfoFromRequest(req);

        const chatUsersRequestDTO = plainToInstance(ChatUsersRequestDTO, req.body);
        chatUsersRequestDTO.id = decoded.userId;
        await validateDTO(chatUsersRequestDTO);

        const data = await this.chatService.getUsers(chatUsersRequestDTO);
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