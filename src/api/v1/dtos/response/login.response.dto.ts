import 'reflect-metadata';
import { IsDefined, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";
import { UserDTO } from '../model';


export default class LoginResponseDTO {
    @Expose()
    @IsDefined()
    token?: string;

    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => UserDTO)
    user?: UserDTO;
}