const express = require('express')
const path = require('path')
const routes = require('./routes')
const app = express()
require('./loaders')()

const apiKeyChecker = require('./middlewares/auth/apiKeyChecker')
const errorHandler = require('./middlewares/errors/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(apiKeyChecker)
app.use('/api', routes)
app.use(errorHandler)

module.exports = app
