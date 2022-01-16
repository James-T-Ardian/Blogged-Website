import express, {Router} from 'express'

const controller = require('../controller/signOutController') // Change after migrating controller

const router:Router = express.Router()

router.post('/', controller.logOutUser)

export {router as signoutRoute}