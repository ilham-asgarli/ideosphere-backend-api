import { Expose } from 'class-transformer';
import { IsDefined, IsDate, IsUUID } from 'class-validator';

export default class ChatDTO {
  @Expose()
  @IsDefined()
  @IsUUID()
  id?: string;

  @Expose()
  @IsDefined()
  @IsDate()
  created_at?: Date;

  @Expose()
  @IsDefined()
  @IsDate()
  updated_at?: Date;
}
