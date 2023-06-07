import { Expose } from 'class-transformer';
import { IsDefined, IsDate, IsUUID, IsInt, Min, Length } from 'class-validator';

export default class EventDTO {
  @Expose()
  @IsDefined()
  @IsUUID()
  id?: string;

  @Expose()
  @IsDefined()
  @Min(1)
  @IsInt()
  gender_id?: number;

  @Expose()
  @IsDefined()
  @IsUUID()
  organizer_id?: string;

  @Expose()
  @IsDefined()
  @IsUUID()
  chat_id?: string;

  @Expose()
  name?: string;

  @Expose()
  @Length(0, 3000)
  description?: string;

  @Expose()
  address?: string;

  @Expose()
  @IsDate()
  start_time?: Date;

  @Expose()
  @IsDate()
  end_time?: Date;

  @Expose()
  @Min(0)
  @IsInt()
  max_age?: number;

  @Expose()
  @IsInt()
  @Min(0)
  min_age?: number;

  @Expose()
  @Min(0)
  entry_fee?: number;

  @Expose()
  @Min(1)
  participant_capacity?: number;

  @Expose()
  @IsDefined()
  @IsDate()
  created_at?: Date;

  @Expose()
  @IsDefined()
  @IsDate()
  updated_at?: Date;
}
