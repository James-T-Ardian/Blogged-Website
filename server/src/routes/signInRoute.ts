import express, {Router} from 'express'

import *  as signInController from '../controller/signInController'

const router:Router = express.Router()

// Routes
router.get('/', signInController.checkIfLoggedIn)
router.post('/', signInController.logInUser)

export {router as signinRoute}

