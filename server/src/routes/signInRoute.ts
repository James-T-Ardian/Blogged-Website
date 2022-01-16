import express, {Router} from 'express'

const controller = require('../controller/signInController') // Change after migrating controller

const router:Router = express.Router()

router.get('/', controller.checkIfLoggedIn)

router.post('/', controller.logInUser)

export {router as signinRoute}

