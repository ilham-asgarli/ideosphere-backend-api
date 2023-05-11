// import env from './env.loader'
import database from './database.loader'

export default async () => {
    // env()
    await database();
}
