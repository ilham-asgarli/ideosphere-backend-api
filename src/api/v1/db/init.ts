import { Chat, ChatMessage, ChatUser, Company, Currency, Customer, Event, EventGender, EventLocation, EventParticipant, User, UserGender, UserType } from "./models"

const isDev: boolean = process.env.NODE_ENV === 'development'
const alter: boolean = isDev

const dbInit = async () => {
        await Currency.sync({ alter });
        await UserGender.sync({ alter });
        await UserType.sync({ alter });
        await User.sync({ alter });
        await Company.sync({ alter });
        await Customer.sync({ alter });
        await Chat.sync({ alter });
        await ChatMessage.sync({ alter });
        await ChatUser.sync({ alter });
        await EventGender.sync({ alter });
        await Event.sync({ alter });
        await EventLocation.sync({ alter });
        await EventParticipant.sync({ alter });
}

export default dbInit