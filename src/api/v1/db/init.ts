import { Company, User, UserType } from "./models"

const isDev: boolean = process.env.NODE_ENV === 'development'
const alter: boolean = isDev

const dbInit = () => {
        UserType.sync({ alter: alter })
        User.sync({ alter: alter })
        Company.sync({ alter: alter })
}

export default dbInit