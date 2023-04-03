const DataResult = require('./dataResult')

class ErrorDataResult extends DataResult {

    constructor(data, message) {
        super(data, false, message)
    }

}

module.exports = ErrorDataResult
