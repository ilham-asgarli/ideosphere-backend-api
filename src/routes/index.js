const router = require('express').Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')

router.use('/users', userRouter)
router.use('/auth', authRouter)

module.exports = router
