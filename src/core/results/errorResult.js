const Result = require('./result')

class ErrorResult extends Result {
    constructor(message) {
        super(false, message)
    }
}

module.exports = ErrorResult
