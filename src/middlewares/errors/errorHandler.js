const { ErrorResult } = require("../../core/results")

const errorHandler = (error, req, res, next) => {

    res.status(error?.status || 500)
        .send(new ErrorResult(
            error.message || 'Internal Server Error')
        )

    next()
}

module.exports = errorHandler
