const mongoose = require('mongoose')

async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = main
