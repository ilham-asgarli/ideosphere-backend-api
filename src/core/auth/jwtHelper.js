const jwt = require('jsonwebtoken')

const createToken = async (user) => {
    const { JWT_EXPIRE_DATE, JWT_SECRET_KEY } = process.env

    return jwt.sign({
        userId: user._id,
        username: user.username,
        roles: user.roles
    }, JWT_SECRET_KEY, { algorithm: 'HS512', expiresIn: JWT_EXPIRE_DATE })
}

const getUserInfoFromToken = (token) => {
    try {
        const { JWT_SECRET_KEY } = process.env
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch {
        return undefined
    }
}

module.exports = {
    createToken,
    getUserInfoFromToken
}
