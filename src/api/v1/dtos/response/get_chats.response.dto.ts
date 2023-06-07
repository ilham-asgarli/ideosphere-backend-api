import { IsDefined, IsUUID, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserDTO } from '../model';
import GetMessagesResponseDTO from './get_messages.response.dto';

export default class GetChatsResponseDTO {
  id?: string;

  name?: string;

  messages?: GetMessagesResponseDTO[];

  created_at?: Date;
}
