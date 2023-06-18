import { Sequelize } from 'sequelize';
import { CompanyDTO, CustomerDTO, EventDTO, EventLocationDTO, UserDTO } from '../dtos/model';
import { convertModeltoDTOJSON } from '../helpers/dto_model_convert.helper';
import { Chat, ChatUser, Company, Customer, Event, EventLocation, EventParticipant, EventTag, User } from '../models';

export class EventService {

  EARTH_RADIUS = 6371; // Radius of the Earth in kilometers

  async getCloseEvents(body: any): Promise<any> {
    const eventLocations = await EventLocation.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`${this.EARTH_RADIUS} *
              acos(
                cos(radians(${body.latitude})) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(${body.longitude})) +
                sin(radians(${body.latitude})) *
                sin(radians(latitude))
              )`),
            'distance',
          ],
        ],
      },
      having: Sequelize.literal(`distance <= ${body.radius / 1000}`), // Convert radius from meters to kilometers
      order: [[Sequelize.literal('distance'), 'ASC']],
      limit: 50,
    });

    return await Promise.all(
      eventLocations.map(async (eventLocation: EventLocation) => {
        const event = await Event.findByPk(eventLocation.event_id);
        const organizer = await User.findByPk(event!.organizer_id);
        const location = await EventLocation.findOne({
          where: {
            event_id: event!.id,
          }
        });
        const customer = await Customer.findOne({
          where: {
            user_id: organizer!.id,
          }
        });

        const company = await Company.findOne({
          where: {
            user_id: organizer!.id,
          }
        });

        const eventResponse = convertModeltoDTOJSON(EventDTO, event!);
        eventResponse.participant_count = await EventParticipant.count({
          where: {
            event_id: event!.id,
          }
        });
        eventResponse.organizer = convertModeltoDTOJSON(UserDTO, organizer!);
        if (customer)
          eventResponse.organizer.customer = convertModeltoDTOJSON(CustomerDTO, customer!);
        if (company)
          eventResponse.organizer.company = convertModeltoDTOJSON(CompanyDTO, company!);
        eventResponse.location = convertModeltoDTOJSON(EventLocationDTO, location!);

        return {
          event: eventResponse,
          distance: eventLocation.get('distance'),
        };
      })
    );
  }

  async createEvent(body: any) {
    const chat = await Chat.create({ name: body.name });

    const chatUser = await ChatUser.create({ chat_id: chat.id, user_id: body.organizer_id, });

    const event = await Event.create({
      name: body.name,
      description: body.description,
      gender_id: body.gender_id,
      chat_id: chat.id,
      address: body.address,
      entry_fee: body.entry_fee,
      organizer_id: body.organizer_id,
      participant_capacity: body.participant_capacity,
      min_age: body.min_age,
      max_age: body.max_age,
      start_time: body.start_time,
      end_time: body.end_time,
    });

    const eventLocation = await EventLocation.create({
      latitude: body.location.latitude,
      longitude: body.location.longitude,
      event_id: event.id,
    });

    if (body.tags) {
      await Promise.all(
        (body.tags as string[]).map(async (tag) => {
          await EventTag.create({
            tag: tag,
            event_id: event.id,
          });
        }),
      );
    }
  }

  async joinEvent(body: any) {
    const event = await Event.findByPk(body.event_id);

    const eventParticipantCount = await EventParticipant.count({
      where: {
        event_id: body.event_id,
      }
    });

    if (event == null || event?.participant_capacity == null || event?.participant_capacity <= eventParticipantCount) {
      return;
    }

    const eventParticipant = await EventParticipant.create({
      event_id: body.event_id,
      user_id: body.user_id,
    });
  }
}