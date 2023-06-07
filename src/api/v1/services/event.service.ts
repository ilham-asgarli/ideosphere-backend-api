import { EventDTO } from '../dtos/model';
import { convertModeltoDTOJSON } from '../helpers/dto_model_convert.helper';
import { Event } from '../models';

export class EventService {
  async getCloseEvents(RequestDTO: any): Promise<any> {
    const events = await Event.findAll();

    const all = events.map((event) => {
      return convertModeltoDTOJSON(EventDTO, event);
    });

    return all;
  }
}
