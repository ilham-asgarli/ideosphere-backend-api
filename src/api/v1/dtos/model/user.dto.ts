import { IsDefined, IsEmail, IsDate, Min, IsUUID, IsInt, IsPhoneNumber, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export default class UserDTO {
  @Expose()
  @IsDefined()
  @IsUUID()
  id?: string;

  @Expose()
  @IsDefined()
  @Min(1)
  @IsInt()
  user_type_id?: number;

  @Expose()
  @IsDefined()
  @IsEmail()
  email?: string;

  @Expose()
  @IsDefined()
  @Length(6)
  password?: string;

  @Expose()
  @IsPhoneNumber()
  phone_number?: string;

  @Expose()
  @IsDefined()
  @IsDate()
  created_at?: Date;

  @Expose()
  @IsDefined()
  @IsDate()
  updated_at?: Date;
}
