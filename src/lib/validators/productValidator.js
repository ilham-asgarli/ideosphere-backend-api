const Joi = require('joi')
const { ErrorDataResult, SuccessResult } = require('../../core/results')
const errorMessages = require('../messages/errorMessages')
Joi.objectId = require('joi-objectid')(Joi)

const productValidator = (product) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        category: Joi.objectId().required()
    })

    const result = schema.validate(product)
    return result.error
        ? new ErrorDataResult(result.error, errorMessages.validationError)
        : new SuccessResult()
}

const productValidatorMany = (products) => {

    const schema = Joi.array().required().min(1).items(
        Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            category: Joi.objectId().required()
        }))

    const result = schema.validate(products)

    return result.error
        ? new ErrorDataResult(result.error, errorMessages.validationError)
        : new SuccessResult()
}

module.exports = {
    productValidator,
    productValidatorMany
}