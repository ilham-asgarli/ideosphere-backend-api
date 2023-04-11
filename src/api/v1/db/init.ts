import { Chat, ChatMessage, ChatUser, Company, Currency, Customer, Event, EventGender, EventLocation, EventParticipant, User, UserGender, UserType } from "./models"

const isDev: boolean = process.env.NODE_ENV === 'development'
const alter: boolean = isDev

const dbInit = async () => {
        await Currency.sync({ alter: alter });
        await UserGender.sync({ alter: alter });
        await UserType.sync({ alter: alter });
        await User.sync({ alter: alter });
        await Company.sync({ alter: alter });
        await Customer.sync({ alter: alter });
        await Chat.sync({ alter: alter });
        await ChatMessage.sync({ alter: alter });
        await ChatUser.sync({ alter: alter });
        await EventGender.sync({ alter: alter });
        await Event.sync({ alter: alter });
        await EventLocation.sync({ alter: alter });
        await EventParticipant.sync({ alter: alter });
}

export default dbInit