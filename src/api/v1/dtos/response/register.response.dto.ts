import { Expose, Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { UserDTO } from "../model";

export default class RegisterResponseDTO {
    @Expose()
    @IsDefined()
    token?: string;

    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => UserDTO)
    user?: UserDTO;
}