const { getUserInfoFromToken } = require("../../core/auth/jwtHelper")
const SystemError = require("../../core/models/errors/SystemError")
const errorMessages = require("../../lib/messages/errorMessages")

const securedOperation = (requiredRoles) => {
    return (req, res, next) => {
        const token = req.get('Authorization')
        if (!token) return next(new SystemError(errorMessages.tokenMissing, 401))

        const userRoles = getUserInfoFromToken(token)?.roles
        if (!userRoles) return next(new SystemError(errorMessages.authDenied, 401))

        for (const userRole of userRoles) {
            if (requiredRoles.includes(userRole)) return next()
        }

        return next(new SystemError(errorMessages.authDenied, 401))
    }
}

module.exports = securedOperation
