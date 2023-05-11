import { plainToInstance, instanceToPlain } from "class-transformer";
import { Model } from "sequelize";

export const toDTOJSON = (DTO: any, model: Model<any, any>): any => {
    const dto = plainToInstance(DTO, instanceToPlain(model.dataValues), {excludeExtraneousValues: true});
    return instanceToPlain(dto);
}

export const toModelJSON = <T extends Model<any, any>> (model: any, DTO: any): any => {
    const registerUser = plainToInstance(model, instanceToPlain(DTO)) as T;
    return registerUser.toJSON();
}