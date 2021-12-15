const express = require('express')

const router = express.Router()

const controller = require('../controller/signinController')

router.post('/', controller.loginUser)

module.exports = router

