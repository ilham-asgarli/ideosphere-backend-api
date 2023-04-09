import loadConfig from './loadConfig'
import connectDatabase from './databaseConnection'

export default () => {
    loadConfig()
    connectDatabase()
}
