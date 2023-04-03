const {registerViaFacebook} = require('../controllers/authControllers')
const router = require('express').Router()

router.post('/regiserViaFacebook', registerViaFacebook)

module.exports = router
