import { sequelize } from '../config/sequelize.config';
import {
  EventGender,
  UserGender,
  UserType,
} from '../models';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';
const alter: boolean = false; // isDevelopment

export async function dbInit(): Promise<void> {
  await sequelize.sync({alter: alter });

  await UserType.create({ name: 'customer' });
  await UserType.create({ name: 'company' });

  await UserGender.create({ name: 'male' });
  await UserGender.create({ name: 'female' });

  await EventGender.create({ name: 'male' });
  await EventGender.create({ name: 'female' });
  await EventGender.create({ name: 'both' });
}
