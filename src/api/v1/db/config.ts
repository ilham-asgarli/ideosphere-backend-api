import { Dialect, Sequelize } from 'sequelize'
import NotFoundError from '../errors/not_found.error'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  define: {
    underscored: true,
  },
});

export { sequelize }