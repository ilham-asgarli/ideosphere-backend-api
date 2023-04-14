import { Chat, ChatMessage, ChatUser, Company, Currency, Customer, Event, EventGender, EventLocation, EventParticipant, User, UserGender, UserType } from "./models"

const isDevelopment: boolean = process.env.NODE_ENV === 'development';
const alter: boolean = false; // isDevelopment

export function dbInit(): void {
    Promise.all([
        Currency.sync({ alter }),
        UserGender.sync({ alter }),
        UserType.sync({ alter }),
        User.sync({ alter }),
        Company.sync({ alter }),
        Customer.sync({ alter }),
        Chat.sync({ alter }),
        ChatMessage.sync({ alter }),
        ChatUser.sync({ alter }),
        EventGender.sync({ alter }),
        Event.sync({ alter }),
        EventLocation.sync({ alter }),
        EventParticipant.sync({ alter }),
    ]);
}