import { Expose } from 'class-transformer';
import { IsDefined, IsDate, IsUUID, IsLatitude, IsLongitude } from 'class-validator';

export default class EventLocationDTO {
  @Expose()
  @IsDefined()
  @IsUUID()
  id?: string;

  @IsDefined()
  @IsUUID()
  event_id?: string;

  @Expose()
  @IsDefined()
  @IsLatitude()
  latitude?: number;

  @Expose()
  @IsDefined()
  @IsLongitude()
  longitude?: number;

  @Expose()
  @IsDefined()
  @IsDate()
  created_at?: Date;

  @Expose()
  @IsDefined()
  @IsDate()
  updated_at?: Date;
}
