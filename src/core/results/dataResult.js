const Result = require('./result')

class DataResult extends Result {

    constructor(data = null, success, message) {
        super(success, message)
        this.data = data
    }
}

module.exports = DataResult
