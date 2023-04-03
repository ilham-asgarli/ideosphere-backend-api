const {authService} = require('../services')

const registerViaFacebook = async (req, res, next) => {
    const authInfo = req.body
    const result = await authService.registerViaFacebook(authInfo)
    const statusCode = result.success ? 200 : 400
    res.status(statusCode).send(result)
    next()
}

module.exports = {
    registerViaFacebook
}
