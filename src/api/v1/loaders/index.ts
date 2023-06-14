import { dbInit } from './database.loader';

export default async () => {
  await dbInit();
};
