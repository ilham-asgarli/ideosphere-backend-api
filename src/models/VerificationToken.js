const mongoose = require('mongoose')

const VerificationTokenSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    token: {
        code: String,
    },

    category: {
        type: String,
        enum: ['mail', 'phone']
    },

    expireDate: Date,

}, {versionKey: false})

module.exports = mongoose.model('verificationToken', VerificationTokenSchema)
