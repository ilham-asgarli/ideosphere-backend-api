import { Chat, ChatMessage, ChatUser, Company, Currency, Customer, Event, EventGender, EventLocation, EventParticipant, User, UserGender, UserType } from "../models"

const isDevelopment: boolean = process.env.NODE_ENV === 'development';
const alter: boolean = false; // isDevelopment

export async function dbInit(): Promise<void> {
    await Currency.sync({ alter });
    await UserGender.sync({ alter });
    await UserType.sync({ alter });
    await User.sync({ alter });
    await Company.sync({ alter });
    await Customer.sync({ alter });
    await Customer.sync({ alter });
    await Chat.sync({ alter });
    await ChatUser.sync({ alter });
    await ChatMessage.sync({ alter });
    await EventGender.sync({ alter });
    await Event.sync({ alter });
    await EventLocation.sync({ alter });
    await EventParticipant.sync({ alter });
    
    await UserType.create({name: "customer"});
    await UserType.create({name: "company"});
}