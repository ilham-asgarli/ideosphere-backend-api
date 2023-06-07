import { IsDefined, IsDate, IsUUID, IsNotEmpty } from 'class-validator';

export default class EventParticipantDTO {
  @IsDefined()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsUUID()
  user_id?: string;

  @IsDefined()
  @IsUUID()
  event_id?: string;

  @IsDefined()
  @IsDate()
  created_at?: Date;

  @IsDefined()
  @IsDate()
  updated_at?: Date;
}
