const { userService } = require('../services')

const getAll = async (req, res, next) => {
    const result = await userService.getAll({}, 'username', {referance : 'user', populatedFields : 'username'})
    const statusCode = result.success ? 200 : 400
    res.status(statusCode).send(result)
    next()
}

const add = async (req, res, next) => {
    const user = req.body
    const result = await userService.add(user)
    const statusCode = result.success ? 200 : 400
    res.status(statusCode).send(result)
    next()
}

const addFriend = async (req, res, next) => {
    const { friendId } = req.body
    const result = await userService.addFriend(friendId)
    const statusCode = result.success ? 200 : 400
    res.status(statusCode).send(result)
    next()
}

module.exports = {
    getAll,
    add,
    addFriend
}