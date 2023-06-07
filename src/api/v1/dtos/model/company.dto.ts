import { Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsDate, Min, IsUUID, IsInt, IsPhoneNumber, Length } from 'class-validator';

export default class CompanyDTO {
  @Expose()
  @IsDefined()
  @IsUUID()
  id?: string;

  @Expose()
  @IsDefined()
  @IsUUID()
  user_id?: string;

  @Expose()
  name?: string;

  @Expose()
  @Length(0, 1000)
  description?: string;

  @Expose()
  @IsDefined()
  @IsDate()
  created_at?: Date;

  @Expose()
  @IsDefined()
  @IsDate()
  updated_at?: Date;
}
