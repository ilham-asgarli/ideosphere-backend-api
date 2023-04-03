const {ErrorResult, SuccessDataResult, SuccessResult} = require("../core/results")
const resultMessages = require("../lib/messages/resultMessages")

class BaseService {

    constructor(model) {
        this.model = model
    }

    async getById(id, selectedFields = null, {reference, populatedFields} = {}, sortBy = null) {

        const result = await this.model.findById(id, selectedFields)
            .populate(reference, populatedFields)
            .sort(sortBy)

        return !result
            ? new ErrorResult(resultMessages.dataIsNull)
            : new SuccessDataResult(result, resultMessages.dataListed)
    }

    async getOne(query = {}, selectedFields = null, {reference, populatedFields} = {}, sortBy = null) {

        const result = await this.model.findOne(query, selectedFields)
            .populate(reference, populatedFields)
            .sort(sortBy)

        return !result
            ? new ErrorResult(resultMessages.dataIsNull)
            : new SuccessDataResult(result, resultMessages.dataListed)
    }

    async getAll(query = {}, selectedFields = null, {reference, populatedFields} = {}, sortBy = null) {

        const result = await this.model.find(query, selectedFields)
            .populate(reference, populatedFields)
            .sort(sortBy)

        return !result
            ? new ErrorResult(resultMessages.dataIsNull)
            : new SuccessDataResult(result, resultMessages.dataListed)
    }

    async add(object) {
        const data = await this.model.create(object)
        return new SuccessDataResult(data, resultMessages.added)
    }

    async findByIdAndRemove(id) {
        const data = await this.model.findByIdAndRemove(id)
        if (data) return new SuccessResult(resultMessages.deleted)
        return new ErrorResult(resultMessages.dataIsNull)
    }

    async deleteOne(query = {}) {
        const data = await this.model.deleteOne(query)
        if (data) return new SuccessResult(resultMessages.deleted)
        return new ErrorResult(resultMessages.dataIsNull)
    }

    async deleteAll(query = {}) {
        await this.model.deleteMany(query)
        return new SuccessResult(resultMessages.deleted)
    }

    async findByIdAndUpdate(id, object) {
        await this.model.findByIdAndUpdate(id, object)
        return new SuccessResult(resultMessages.updated)
    }

    async updateOne(query = {}, object = {}) {
        await this.model.updateOne(query, object)
        return new SuccessResult(resultMessages.updated)
    }

    async updateMany(query = {}, object = {}) {
        await this.model.updateMany(query, object)
        return new SuccessResult(resultMessages.updated)
    }

}

module.exports = BaseService
