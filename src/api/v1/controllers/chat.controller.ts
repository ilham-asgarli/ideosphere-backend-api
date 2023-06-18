import { getInfoFromRequest } from "../helpers/jwt.helper";
import { handleErrorAsync } from "../middlewares/errors/async_error_handler.middleware";
import { ChatService } from "../services";
import { ChatValidator } from "../validators";

export class ChatController {
    chatService = new ChatService();
    chatValidator = new ChatValidator();

    newMessage = handleErrorAsync(async (req, res) => {
        const decoded = await getInfoFromRequest(req);

        req.body.user_id = decoded.userId;
        req.body.chat_id = req.params.chat_id;
        this.chatValidator.onNewMessage(req.body);
        
        let data = await this.chatService.writeMessage(req.body);
    });
}