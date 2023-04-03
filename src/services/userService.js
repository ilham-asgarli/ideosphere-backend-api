const BaseService = require('./baseService')
const User = require('../models/User')
const { SuccessDataResult } = require('../core/results')

class UserService extends BaseService {

    async addFriend(friendId) {
        const user = await this.model.findById('61b9e774dd4ad9db15cb61f0')
        user.friends.push(friendId)
        await user.save()

        return new SuccessDataResult(user)
    }
}

module.exports = new UserService(User)