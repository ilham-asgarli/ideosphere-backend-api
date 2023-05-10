import { IsDefined, Length } from "class-validator";

export default class ResetPasswordRequestDTO {
    @IsDefined()
    @Length(6)
    password?: string;
}