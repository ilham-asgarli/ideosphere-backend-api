import { plainToInstance, instanceToPlain } from 'class-transformer';
import { Model } from 'sequelize';

export function convertModeltoDTOJSON(dto: any, model: Model<any, any>): any {
  const d = plainToInstance(dto, instanceToPlain(model.dataValues), { excludeExtraneousValues: true });
  return instanceToPlain(d);
}

export function convertDTOtoModelJSON<T extends Model<any, any>>(model: any, dto: any): any {
  const m = plainToInstance(model, instanceToPlain(dto)) as T;
  return m.toJSON();
}
