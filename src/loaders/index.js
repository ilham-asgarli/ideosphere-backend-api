const loadConfig = require('./loadConfig')
const connectDatabase = require('./databaseConnection')

module.exports = () => {
    loadConfig()
    connectDatabase()
}
