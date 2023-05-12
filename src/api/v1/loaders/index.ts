// import env from './env.loader'
import { dbInit } from "./database.loader";

export default async () => {
    // env()
    await dbInit();
}
