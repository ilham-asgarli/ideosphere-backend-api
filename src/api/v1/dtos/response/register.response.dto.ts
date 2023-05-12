import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export default class RegisterResponseDTO {
    @Expose()
    @IsDefined()
    token?: string;
}