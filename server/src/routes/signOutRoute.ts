import express, {Router} from 'express'

import * as signOutController from '../controller/signOutController'

const router:Router = express.Router()

// Routes
router.post('/', signOutController.logOutUser)

export {router as signoutRoute}