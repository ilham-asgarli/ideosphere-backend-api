const Result = require("./result")

class SuccessResult extends Result {
    constructor(message) {
        super(true, message)
    }
}

module.exports = SuccessResult
