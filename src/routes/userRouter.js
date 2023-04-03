const router = require('express').Router()
const {userControllers} = require('../controllers')

router.get('/getall', userControllers.getAll)
router.post('/add', userControllers.add)
router.post('/addfriend', userControllers.addFriend)

module.exports = router
