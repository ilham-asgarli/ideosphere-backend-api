import { User } from "./models"

const isDev: boolean = process.env.NODE_ENV === 'development'
const alter: boolean = isDev

const dbInit = () => {
        User.sync({ alter: alter })
}

export default dbInit