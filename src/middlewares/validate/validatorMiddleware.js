const validationMiddleware = (validator) => {
    return (req, res, next) => {
        const result = validator(req.body)
        if (result.success) return next()

        res.status(400).send(result)
    }
}

module.exports = validationMiddleware
