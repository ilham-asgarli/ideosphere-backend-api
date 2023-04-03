const User = require('../models/User')
const BaseService = require('./baseService')

class AuthService extends BaseService {

    async registerViaMail(){
        
    }
}

module.exports = new AuthService(User)
