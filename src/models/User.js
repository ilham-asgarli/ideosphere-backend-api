const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    firstName: {type: String},

    lastName: {type: String},

    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],

    xpValue: {
        type: Number,
        default: 0
    },

    coinsValue: {
        type: Number,
        default: 0
    },

    moneyValue: {
        type: Number,
        default: 0
    },

    roles: {
        type: [String],
        default: ['user']
    },

    profilPhotoUrl: {
        type: String,
        default: 'https://i.imgur.com/Bn8ZilB.png'
    },

    lastActiveTime: {
        type: Date,
        default: new Date()
    },

    gender: {
        type: String,
        enum: ['Bay', 'Bayan']
    },

    birthDate: {type: Date},

    city: {type: String},

    status: {
        isBanned: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false}
    },

    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    }

    // {mail} or {phone}

    // social

}, {versionKey: false})


module.exports = mongoose.model('user', UserSchema)
