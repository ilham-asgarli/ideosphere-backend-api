const SystemError = require("../../core/models/errors/SystemError")
const errorMessages = require("../../lib/messages/errorMessages")

const apiKeyChecker = (req, res, next) => {

    if (!req?.get('x-api-key')) return next(new SystemError(errorMessages.apiKeyMissing, 401))
    const apiKey = req.get('x-api-key')
    if (apiKey !== process.env.API_KEY) return next(new SystemError(errorMessages.invalidApiKey, 401))
    next()
}

module.exports = apiKeyChecker