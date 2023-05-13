import { IsDefined, Length, IsUUID } from "class-validator";
import { Expose } from "class-transformer";

export default class ResetPasswordRequestDTO {
    @Expose()
    @IsDefined()
    @IsUUID()
    id?: string;

    @IsDefined()
    oldPassword?: string;

    @IsDefined()
    @Length(6)
    newPassword?: string;
}