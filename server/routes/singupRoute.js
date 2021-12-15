const express = require('express')

const router = express.Router()

const controller = require('../controller/signupController')

router.post('/', controller.createNewUser)

module.exports = router